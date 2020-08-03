const Chats = require('../services/chats')
const UsersAuth = require('../services/users_authentication')

module.exports = app => {
  app.get('/chats', UsersAuth.authenticateToken, (req, res) => {
    Chats.listChats(req)
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(`${error}`)
      })
  })

  app.get('/messages/:id', UsersAuth.authenticateToken, (req, res) => {
    const chatId = parseInt(req.params.id)
    Chats.listMessages(chatId)
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(`${error}`)
      })
  })

  app.post('/messages/:id', UsersAuth.authenticateToken, (req, res) => {
    const chatId = parseInt(req.params.id)
    Chats.sendMessage(req, chatId)
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(`${error}`)
      })
  })
}