const Courses = require('../services/courses');

module.exports = app => {
  app.get('/courses', (req, res) => {
    Courses.list()
      .then(result => {
        res.status(200).send(result)
      })
      .catch((err) => {
        res.status(500).send(`${err}`)
      })
  })
}