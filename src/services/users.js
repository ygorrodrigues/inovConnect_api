require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');

class Users {

  async register(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      db.users.create({
        name: req.body.name,
        password: hashedPassword,
        raCode: req.body.ra_code,
        email: req.body.email
      })
      .then(newUser => {
        return res.status(200).send(newUser);
      })
      .catch(error => {
        return res.status(400).send(error);
      })
    }
    catch (error) {
      return res.status(500).send(error);
    }
  }

  createToken(req, res) {
    db.users.findAll({
      where: {
        name: req.body.name
      }
    }).then(async result => {
      if (result != '') {
        try{
          if(await bcrypt.compare(req.body.password, result[0].password)) {
            const id = result[0].id;
            const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: 1000
            });
            res.status(200).json({ auth: true, accessToken: token });
          } else {
            res.status(400).json({ auth: false, 'message': 'Não foi possível autenticar' });
          }
        }
        catch (error) {
          res.status(500).send(error);
        }
      } else {
        return res.status(404).send('Usuário não encontrado.');
      }
    }).catch(error => res.status(500).send(error));
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

  list(req, res) {
    db.users.findAll({
      where: {
        id: req.userId
      },
      attributes: ['name', 'ra_code', 'email']
    })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(error => {
      res.status(400).send(error);
    });
  }

}

module.exports = new Users;