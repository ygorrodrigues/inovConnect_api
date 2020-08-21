const db = require('../models');

class Types {
  list() {
    return db.types.findAll({
      attributes: ['id', 'name']
    })
      .then(result => { return result })
      .catch((e) => { throw Error(e) })
  }

  listWithCategories() {
    return db.types.findAll({
      attributes: ['id', 'name']
    })
    .then(resultTypes => {
      return db.categories.findAll({
        attributes: ['id', 'name']
      })
      .then(resultCategories => {
        return {
          'types': resultTypes,
          'categories': resultCategories
        }
      })
      .catch((e) => { throw Error(e) })
    })
    .catch((e) => { throw Error(e) })
  }
}

module.exports = new Types;