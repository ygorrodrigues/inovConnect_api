const Members = require('../services/members')
const UsersAuth = require('../services/users_authentication')

module.exports = app => {
  app.post('/members', UsersAuth.authenticateToken, (req, res) => {
    Members.add(req)
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(`${error}`)
      })
  })

  app.get('/members-of-post', UsersAuth.authenticateToken, (req, res) => {
    Members.listMembersOfPost(req)
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(`${error}`)
      })
  })

  app.get('/members-status', UsersAuth.authenticateToken, (req, res) => {
    Members.listMembers(req)
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(error)
      })
  })

  app.get('/list-notifications', UsersAuth.authenticateToken, (req, res) => {
    Members.listNotifications(req)
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(error)
      })
  })

  app.patch('/notifications-seen-update', (req, res) => {
    Members.notificationsSeenUpdate(req)
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(error)
      })
  })

  app.patch('/member-status-change', UsersAuth.authenticateToken, (req, res) => {
    Members.memberStatusChange(req)
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(error)
      })
  })
}