require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const UserEmail = require('./users_email');

const expirationTime = '1d'

class UsersAuth {
  async register(req) {
    try {
      if (req.body.password == '')
        throw Error('Digite uma senha')
      if (req.body.courseId == null)
        throw Error('Selecione o seu curso')
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      return db.users.create({
        name: req.body.name,
        password: hashedPassword,
        raCode: parseInt(req.body.raCode, 10),
        email: req.body.email,
        courseId: req.body.courseId
      })
        .then(newUser => {
          UserEmail.sendConfirmationEmail(newUser.id, req.body.email)
          return newUser
        })
        .catch((e) => { throw Error(e) })
    }
    catch (e) {
      throw Error(e)
    }
  }

  confirmEmail(token) {
    const user = jwt.verify(token, process.env.EMAIL_SECRET);
    return db.users.update(
      { confirmed: true },
      { where: { id: user.id } }
    )
      .then(result => {
        return {'message': 'Usuário confirmado com sucesso!'}
      })
      .catch((err) => { throw Error(err) })
  }

  resetPassword(req) {
    return db.users.findAll({
      where: {
        email: req.body.email
      }
    })
      .then(result => {
        if (result != '') {
          UserEmail.sendResetEmail(result[0].id, result[0].email)
          return { user: true, 'message': 'Email com instruções enviado com sucesso!' }
        }
        return { user: false, 'message': 'Usuário não encontrado.' }
      })
      .catch((e) => { throw Error(e) })
  }

  async changePassword(req) {
    try {
      const user = jwt.verify(req.params.token, process.env.PASSWORD_RESET_SECRET);
      const hashedPassword = await bcrypt.hash(req.body.pwd, 10);
      return db.users.update(
        { password: hashedPassword },
        { where: { id: user.id } }
      )
        .then(result => {
          return 'Sua senha foi alterada com sucesso!'
        })
    } catch (e) {
      if(e && e.name === 'TokenExpiredError') {
        throw Error('Você não pode mais alterar sua senha')
      }
      throw Error('Ocorreu um erro inesperado.')
    }
  }

  createToken(req) {
    return db.users.findAll({
      where: {
        raCode: req.body.raCode
      }
    }).then(async result => {
      if (result != '') {
        try {
          if (!result[0].confirmed) {
            throw new Error('Confirme o email para continuar!')
          }
          if (await bcrypt.compare(req.body.password, result[0].password)) {
            const id = result[0].id;
            const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: expirationTime
            })
            return { auth: true, accessToken: token }
          } else {
            return { auth: false, 'message': 'Não foi possível autenticar. RA ou senha incorretos.' }
          }
        }
        catch (error) {
          throw Error(error)
        }
      } else {
        return { auth: false, 'message': 'Usuário não encontrado.' }
      }
    }).catch((e) => { throw Error(e) });
  }

  authenticateToken(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ auth: false, message: 'Não autenticado' });
    }

    jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, user) {
      if (err && err.name === 'TokenExpiredError') {
        return res
          .status(401)
          .json({ statusCode: 401, auth: false, message: 'Token expirado', expiredIn: err.expiredAt })
      }
      if (err) {
        return res.status(500).json({ auth: false, message: 'Erro ao autenticar.' });
      }
      req.userId = user.id;
      next();
    })
  }

  firstAuthentication(req) {
    return new Promise((resolve, reject) => {
      var token = req.headers.authorization
      if (!token) {
        reject({ auth: false, message: 'Não autenticado' })
      }

      var result = jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, user) {
        if (err && err.name === 'TokenExpiredError') {
          return { auth: false, message: 'Token expirado', expiredIn: err.expiredAt }
        }
        if (err) {
          return { auth: false, message: 'Erro ao autenticar.' }
        }
        return db.users.find({
          where: {
            id: user.id
          }
        }).then(user => {
          if(!user) {
            return { auth: false, message: `Erro ao autenticar` }
          }
          return { auth: true, message: `Sucesso ao autenticar` }
        }).catch(e => {
          return { auth: false, message: `Erro ao autenticar` }
        })
      })
      if(result.auth) {
        resolve(result)
      }
      else {
        reject(result)
      }      
    })
  }
}
module.exports = new UsersAuth;