const Users = require('../models/users');

module.exports = app => {
  app.post('/users/login', (req, res) => {
    Users.createToken(req, res);
  });

  app.post('/users/register', (req, res) => {
    Users.register(req, res);
  });
}