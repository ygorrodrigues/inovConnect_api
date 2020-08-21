const db = require('../models')
const pendingMember = 1
const Chats = require('./chats')

class Members {
  add(req) {
    const postId = parseInt(req.body.post)
    return this._verifyExistenceMember(req, postId)
      .then(result => {
        if(result.length === 0) {
          return db.members.create({
            postId: postId,
            userId: req.userId,
            memberStatusId: 1
          })
            .then(newMember => newMember)
            .catch((e) => { throw Error(e) })
        }
        throw Error('Você já tentou participar ou está participando.')
      })
      .catch((e) => { throw Error(e) })
    }

  _verifyExistenceMember(req, postId) {
    return db.members.findAll({
      attributes: ['id'],
      include: [{
        model: db.users,
        attributes: ['id'],
        where: { 'id': req.userId }
      }],
      include: [{
        model: db.posts,
        attributes: ['id'],
        where: { 'id': postId }
      }]
    })
  }

  listMembers(req) {
    return db.members.findAll({
      attributes: ['id', 'updated_at', 'status_message'],
      include: [{
        model: db.users,
        attributes: ['id', 'name']
      }, {
        model: db.posts,
        attributes: ['id', 'title', 'user_id']
      }, {
        model: db.member_status,
        attributes: ['id', 'name']
      }]
    })
      .then(result => {
        const myPendentPosts = this._myPendentPosts(result, req.userId)
          .map(row => ({...row.dataValues, participation: false}))
        const participations = this._participations(result, req.userId)
          .map(row => ({...row.dataValues, participation: true}))

        const data = myPendentPosts.concat(participations)
        return {
          data: data
        }
      })
      .catch((e) => { throw Error(e) })
  }

  _myPendentPosts(result, userId) {
    return result.filter(row => {
      return row.post.dataValues.user_id === userId &&
        row.member_status.id === 1
    })
  }

  _participations(result, userId) {
    return result.filter(row => {
      return row.user.id === userId
    })
  }

  memberStatusChange(req) {
    switch(req.body.memberStatusId) {
      case 2:        
        return Chats._createChat(req.body.member)
          .then((result) => {
            const chatStatusMessage = 'Você está em uma avaliação por chat, verifique suas mensagens.'
            db.members.update({
              memberStatusId: req.body.memberStatusId,
              status_message: chatStatusMessage
            },{
              where: { id: req.body.member }
            })
            return result
          })
          .catch((e) => { throw Error(e) })
      case 3:
        return db.users.findAll({
          attributes: ['id', 'name' ,'email'],
          where: { 'id': req.userId }
        })
          .then((result) => {
            const aceptedStatusMessage = `Você foi aceito! Entre em contato com sua equipe: ${result[0].email}`
            db.members.update({
              memberStatusId: req.body.memberStatusId,
              status_message: aceptedStatusMessage
            },{
              where: { id: req.body.member }
            })
            return { message: "success" }
          })
          .catch((e) => { throw Error(e) })
      case 4:
        const refusedStatusMessage = 'Você foi recusado... Boa sorte na próxima.'
        return db.members.update({
          memberStatusId: req.body.memberStatusId,
          status_message: refusedStatusMessage
        },{
          where: { id: req.body.member }
        })
          .then(result => result)
          .catch((e) => { throw Error(e) })
      default:
        console.log('Valor estranho enviado na requisição!')
    }
  }
}

module.exports = new Members;