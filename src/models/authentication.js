require('dotenv').config();

const jwt = require('jsonwebtoken');

class Authentication {

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

  authenticateToken(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ auth: false, message: 'Não autenticado' });
    }

    jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET, function (err, user) {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Erro ao autenticar.'});
      }
      next();
    })
  }

}

module.exports = new Authentication;