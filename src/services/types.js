const db = require('../models');

class Types {
  list() {
    return db.types.findAll({
      attributes: ['id', 'name']
    })
      .then(result => { return result })
      .catch((e) => { throw Error(e) })
  }
}

module.exports = new Types;