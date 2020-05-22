const db = require('../models');

class Courses {
  list() {
    return db.courses.findAll({
      attributes: ['id', 'name']
    })
      .then(result => { return result })
      .catch((e) => { throw Error(e) })
  }
}

module.exports = new Courses;