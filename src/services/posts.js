const db = require('../models');

class Posts {

  add(req) {
    return db.posts.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.userId,
      statusId: 1
    })
      .then(newPost => { return newPost })
      .catch((e) => { throw Error(e) })
  }

  list() {
    return db.posts.findAll({
      attributes: ['title', 'description'],
      include: [{
        model: db.categories,
        as: 'categories',
        through: { attributes: [] }
      }, {
        model: db.status,
        attributes: ['name']
      }]
    })
      .then(result => { return result })
      .catch((e) => { throw Error(e) })
  }

  listPendent() {
    return db.posts.findAll({
      include: [{
        model: db.status,
        where: { id: 1 },
        attributes: ['name']
      }],
      attributes: ['title', 'description']
    })
      .then(result => { return result })
      .catch((e) => { throw Error(e) });
  }

  searchId(id) {
    return db.posts.findAll({
      where: {
        id: id
      }
    })
      .then(result => { return result })
      .catch((e) => { throw Error(e) });
  }

  change(id, data) {
    return db.posts.update(
      { title: data.title },
      { where: { id: id } }
    )
      .then((result) => { return result })
      .catch((e) => { throw Error(e) });
  }

  delete(id) {
    return db.posts.destroy({
      where: {
        id: id
      }
    })
      .then((result) => { return result })
      .catch((e) => { throw Error(e) });
  }
}

module.exports = new Posts;