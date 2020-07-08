const Categories = require('../services/categories');

module.exports = app => {
  app.get('/categories', (req, res) => {
    Categories.list()
      .then(result => {
        res.status(200).send(result)
      })
      .catch((err) => {
        res.status(500).send(`${err}`)
      })
  })
}