require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');

class Users {

  async register(req) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      return db.users.create({
        name: req.body.name,
        password: hashedPassword,
        raCode: req.body.ra_code,
        email: req.body.email
      })
        .then(newUser => { return newUser })
        .catch(() => { throw Error })
    }
    catch (e) {
      throw Error
    }
  }

  createToken(req) {
    return db.users.findAll({
      where: {
        name: req.body.name
      }
    }).then(async result => {
      if (result != '') {
        try {
          if (await bcrypt.compare(req.body.password, result[0].password)) {
            const id = result[0].id;
            const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: 10000
            })
            return { auth: true, accessToken: token }
          } else {
            return { auth: false, 'message': 'Não foi possível autenticar' }
          }
        }
        catch (error) {
          throw Error
        }
      } else {
        return { auth: false, 'message': 'Usuário não encontrado.' }
      }
    }).catch(() => { throw Error });
  }

  authenticateToken(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ auth: false, message: 'Não autenticado' });
    }

    jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, user) {
      if (err) {
        return res.status(500).json({ auth: false, message: 'Erro ao autenticar.' });
      }
      req.userId = user.id;
      next();
    })
  }

  list(req) {
    return db.users.findAll({
      where: {
        id: req.userId
      },
      attributes: ['name', 'ra_code', 'email']
    })
      .then(result => { return result })
      .catch(error => { throw Error });
  }

}

module.exports = new Users;