const UsersProfile = require('../services/users_profile');
const UsersAuth = require('../services/users_authentication');

module.exports = app => {
  app.get('/user/profile', UsersAuth.authenticateToken, (req, res) => {
    UsersProfile.list(req)
      .then(response => {
        res.status(200).send(response)
      })
      .catch(error => {
        res.status(500).send(`${error}`)
      })
  });
}