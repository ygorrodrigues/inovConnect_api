require('dotenv').config();

const db = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class Users {

  async register(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const data = {
        "name": req.body.name,
        "ra": req.body.ra_code,
        "email": req.body.email
      }
      const params = [
        req.body.name,
        hashedPassword,
        req.body.ra_code,
        req.body.email
      ];
      const insert = `INSERT INTO users (name, password, ra_code, email)
        VALUES (?,?,?,?)`
      db.run(insert, params, function(err){
        if(err) {
          res.status(400).json({"error": err.message});
          return;
        }
        data.id = this.lastID;
        res.status(201).json({
          "message": "success",
          "user": data
        });
      });
    }
    catch(e){
      res.status(500).send(e.message);
    }
  }

  createToken(req, res) {
    if (req.body.user === '123' && req.body.pwd === '123') {
      const id = 1; //esse id viria do banco de dados
      var token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 300
      });
      return res.status(200).send({ auth: true, accessToken: token });
    }
    res.send('Falha ao autenticar!');
  }

  _find(req, res) {

  }

  authenticateToken(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ auth: false, message: 'Não autenticado' });
    }

    jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, user) {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Erro ao autenticar.' });
      }
      next();
    })
  }

}

module.exports = new Users;