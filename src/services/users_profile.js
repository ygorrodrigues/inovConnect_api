const db = require('../models');

class UsersProfile {
  list(req) {
    return db.users.findOne({
      where: {
        id: req.userId
      },
      attributes: ['id', 'name', 'description'],
      include: [{
        model: db.courses,
        attributes: ['id', 'name']
      }, {
        model: db.posts,
        attributes: ['id', 'title', 'description', 'created_at', 'updated_at'],
        include: [{
          model: db.categories,
          as: 'categories',
          through: { attributes: [] }
        }, {
          model: db.post_status,
          attributes: ['id', 'name']
        }, {
          model: db.types,
          attributes: ['name']
        },{
          model: db.users,
          attributes: ['id', 'name']
        }]
      }]
    })
    .then(userDataResult => {
      return db.members.findAll({
        where: {
          userId: req.userId,
        },
        attributes: ['id'],
        include: [{
          model: db.member_status,
          attributes: ['name'],
          where: { 'name': 'Aceito' }
        }, {
          model: db.posts,
          include: [{
            model: db.types,
            attributes: ['name']
          }, {
            model: db.post_status,
            attributes: ['name'],
            where: { 'name': 'Concluído' }
          }]
        }]
      })
      .then(userMemberResult => {
        return {
          'userData': userDataResult,
          'userParticipation': userMemberResult
        }
      })
      .catch(error => { throw Error })
    })
    .catch(error => { throw Error })
  }

  listOtherUserInfo(otherUserId) {
    return db.users.findOne({
      where: {
        id: otherUserId
      },
      attributes: ['id', 'name', 'description'],
      include: [{
        model: db.courses,
        attributes: ['id', 'name']
      }, {
        model: db.posts,
        attributes: ['id', 'title', 'description', 'created_at', 'updated_at'],
        model: db.posts,
          include: [{
            model: db.types,
            attributes: ['name']
          }, {
            model: db.post_status,
            attributes: ['name'],
            where: { 'name': 'Concluído' }
          }]
      }]
    })
    .then(userDataResult => {
      return db.members.findAll({
        where: {
          userId: otherUserId,
        },
        attributes: ['id'],
        include: [{
          model: db.member_status,
          attributes: ['name'],
          where: { 'name': 'Aceito' }
        }, {
          model: db.posts,
          include: [{
            model: db.types,
            attributes: ['name']
          }, {
            model: db.post_status,
            attributes: ['name'],
            where: { 'name': 'Concluído' }
          }]
        }]
      })
      .then(userMemberResult => {
        return {
          'userData': userDataResult,
          'userParticipation': userMemberResult
        }
      })
      .catch(error => { throw Error })
    })
    .catch(error => { throw Error })
  }

  update(req) {
    return db.users.update(
      { 
        name: req.body.name,
        description: req.body.description,
        courseId: req.body.courseId
      },
      { where: { id: req.userId } }
    )
      .then((result) => { return result })
      .catch((e) => { throw Error(e) })
  }
}

module.exports = new UsersProfile;