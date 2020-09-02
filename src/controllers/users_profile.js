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

  app.get('/other-user/profile/:id', UsersAuth.authenticateToken, (req, res) => {
    const otherUserId = parseInt(req.params.id)
    UsersProfile.listOtherUserInfo(otherUserId)
      .then(response => {
        res.status(200).send(response)
      })
      .catch(error => {
        res.status(500).send(`${error}`)
      })
  });

  app.patch('/user/profile', UsersAuth.authenticateToken, (req, res) => {
    UsersProfile.update(req)
      .then(response => {
        res.status(200).send(response)
      })
      .catch(error => {
        res.status(500).send(error)
      })
  })
}