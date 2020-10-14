const db = require('../models');
const operatorNotNull = db.Sequelize.Op.ne

class Posts {
  add(req) {
    return db.posts.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.userId,
      typeId: req.body.type,
      postStatusId: 1
    })
      .then(newPost => {
        req.body.firstCategory > 0 ? 
          newPost.setCategories([req.body.firstCategory]) : null
        req.body.secondCategory > 0 ?
          newPost.setCategories([req.body.secondCategory]) : null
        return newPost
      })
      .catch((e) => { throw Error(e) })
  }

  addAnotherCategory(req, newCategoryId) {
    return this.add(req)
      .then((newPost) => {
        newCategoryId > 0 ?
          newPost.setCategories([newCategoryId]) : null
        return newPost
      })
      .catch((e) => { throw Error(e) })
  }

  listAll() {
    return db.posts.findAll({
      attributes: ['id', 'title', 'description', 'created_at', 'updated_at'],
      include: [{
        model: db.categories,
        as: 'categories',
        through: { attributes: [] }
      }, {
        model: db.status,
        attributes: ['name']
      }, {
        model: db.types,
        attributes: ['name']
      }, {
        model: db.users,
        attributes: ['name']
      }]
    })
      .then(result => { return result })
      .catch((e) => { throw Error(e) })
  }

  listFilteredPosts(req) {
    const type = parseInt(req.query.type)
    const category = parseInt(req.query.category)
    const page = parseInt(req.query.page)
    const userId = req.userId
    const limit = 50

    return db.posts.findAll({
      attributes: ['id', 'title', 'description', 'created_at', 'updated_at'],
      include: [{
        model: db.categories,
        as: 'categories',
        through: { attributes: [] },
        where: { 'id': category != 0 ? category : {
          [operatorNotNull]: null
        }}
      }, {
        model: db.post_status,
        attributes: ['name'],
        where: { 'name': 'Ativo' }
      }, {
        model: db.types,
        attributes: ['name'],
        where: { 'id': type != 0 ? type : {
          [operatorNotNull]: null
        }}
      }, {
        model: db.users,
        attributes: ['id', 'name']
      }],
      order: [
        ['updated_at', 'DESC']
      ],
      limit: limit,
      offset: ((page-1)*limit),
      subQuery: false
    })
      .then(result => {
        return {
          'yourId': userId,
          'data': result
        }
      })
      .catch((e) => { throw Error(e) })    
  }

  listActive() {
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
      attributes: ['id', 'title', 'description', 'created_at', 'updated_at'],
      include: [{
        model: db.categories,
        as: 'categories',
        through: { attributes: [] },
      }, {
        model: db.post_status,
        attributes: ['name']
      }, {
        model: db.types,
        attributes: ['name'],
      }, {
        model: db.users,
        attributes: ['id', 'name']
      }],
      where: {
        id: id
      }
    })
      .then(result => { return result })
      .catch((e) => { throw Error(e) });
  }

  listPostStatuses() {
    return db.post_status.findAll({
      attributes: ['id', 'name']
    })
      .then(result => { return result })
      .catch((e) => { throw Error(e) })
  }

  update(id, req) {
    let currentTimestamp = new Date()
    return db.posts.update(
      {
        description: req.body.description,
        postStatusId: req.body.statusId,
        updatedAt: currentTimestamp
      },
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