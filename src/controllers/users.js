const Users = require('../services/users');

module.exports = app => {
  app.post('/users/login', (req, res) => {
    Users.createToken(req)
      .then(response => {
        if (response.auth == true) {
          res.status(200).json(response)
        } else {
          res.status(403).json(response)
        }
      })
      .catch(error => {
        res.status(500).send(error)
      })
  });

  app.post('/users/register', (req, res) => {
    Users.register(req)
      .then(response => {
        res.status(200).send(response)
      })
      .catch(error => {
        res.status(500).send(error)
      })
  });

  app.get('/user', Users.authenticateToken, (req, res) => {
    Users.list(req)
      .then(response => {
        res.status(200).send(response)
      })
      .catch(error => {
        res.status(500).send(error)
      })
  });
}