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
      db.run(insert, params, function (err) {
        if (err) {
          res.status(400).json({ "error": err.message });
          return;
        }
        data.id = this.lastID;
        res.status(201).json({
          "message": "success",
          "user": data
        });
      });
    }
    catch (err) {
      res.status(500).send(err.message);
    }
  }

  createToken(req, res) {
    const select = `SELECT * FROM users WHERE name=?`;
    db.all(select, [req.body.name], async (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result != '') {
        try {
          const user = result[0]
          if (await bcrypt.compare(req.body.password, user.password)) {
            const id = user.id;
            const token = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: 150
            });
            res.status(200).send({ auth: true, accessToken: token });
          }
          else {
            res.status(400).send({ auth: false, 'message': 'Não foi possível autenticar' });
          }
        }
        catch (err){
          res.status(500).send(err);
        }
      } else {
        return res.status(400).send('Usuário não encontrado.');
      }
    });
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