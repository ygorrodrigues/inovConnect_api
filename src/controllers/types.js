const Types = require('../services/types');

module.exports = app => {
  app.get('/types', (req, res) => {
    Types.list()
      .then(result => {
        res.status(200).send(result)
      })
      .catch((err) => {
        res.status(500).send(`${err}`)
      })
  })

  app.get('/types-and-categories', (req, res) => {
    Types.listWithCategories()
      .then(result => {
        res.status(200).send(result)
      })
      .catch((err) => {
        res.status(500).send(`${err}`)
      })
  })
}