const Authentication = require('../models/authentication');

module.exports = app => {
  app.post('/login', (req, res) => {
    Authentication.createToken(req, res);
  });
}