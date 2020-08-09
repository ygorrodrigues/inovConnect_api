const db = require('../models');

class Categories {
  list() {
    return db.categories.findAll({
      attributes: ['id', 'name']
    })
      .then(result => { return result })
      .catch((e) => { throw Error(e) })
  }

  add(newCategory) {
    return db.categories.create({
      name: newCategory
    })
      .then(result => { return result })
      .catch((e) => { throw Error(e) })
  }
}

module.exports = new Categories;