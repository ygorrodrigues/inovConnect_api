const db = require('../models')
const Op = db.Sequelize.Op

class Chats {
  _createChat(memberId) {
    return db.members.findAll({
      attributes: ['id', 'user_id', 'updated_at'],
      include: [{
        model: db.posts,
        attributes: ['title', 'user_id']
      }],
      where: {'id': memberId}
    })
      .then((result) => {
        const chatData = result[0].dataValues
        const postData = chatData.post.dataValues
        return db.chats.create({
          memberId: memberId,
          post_title: postData.title
        })
          .then((newChat) => {
            newChat.setUsers([
              chatData.user_id,
              postData.user_id
            ])
            return newChat
          })
          .catch((e) => { throw Error(e) })
      })
      .catch((e) => { throw Error(e) })
  }

  listChats(req) {
    return db.chats.findAll({
      attributes: ['id', 'post_title', 'owner_notified', 'member_notified'],
      include: [{
        model: db.users,
        as: 'users',
        through: { attributes: [] },
        attributes: ['id', 'name']
      }, {
        model: db.members,
        attributes: ['id', 'memberStatusId', 'user_id'],
        where: { 'memberStatusId': 2 }
      }]
    })
      .then(result => {
        const userChats = result.filter(row => {
          return row.users.some(user => user.id === req.userId)
        })
        return userChats
          .map(row => ({...row.dataValues, yourId: req.userId}))
      })
      .catch((e) => { throw Error(e) })
  }

  listMessages(chatId) {
    return db.messages.findAll({
      attributes: ['id', 'message', 'created_at'],
      include: [{
        model: db.users,
        attributes: ['id', 'name']
      }, {
        model: db.chats,
        attributes: ['id', 'post_title']
      }],
      where: { 'chatId': chatId },
      order: [
        ['created_at', 'ASC']
      ],
    })
      .then(result => {
        return result
      })
      .catch((e) => { throw Error(e) })
  }

  sendMessage(req, chatId) {
    return db.messages.create({
      chatId: chatId,
      userId: req.userId,
      message: req.body.message
    })
      .then(newMessage => {
        if(req.body.role == 'owner') {
          db.chats.update({
            member_notified: false
          }, {
            where: {
              id: chatId
            }
          })
        }
        else {
          db.chats.update({
            owner_notified: false
          }, {
            where: {
              id: chatId
            }
          })
        }
        return newMessage
      })
      .catch((e) => { throw Error(e) })
  }

  listChatsNotifications(req) {
    return db.chats.findAll({
      attributes: ['id', 'owner_notified', 'member_notified'],
      include: [{
        model: db.users,
        as: 'users',
        through: { attributes: [] },
        attributes: ['id', 'name']
      }, {
        model: db.members,
        attributes: ['id', 'memberStatusId', 'user_id'],
        where: { 'memberStatusId': 2 }
      }],
      where: {
        [Op.or]: [
          { 'owner_notified': false },
          { 'member_notified': false }
        ]
      }
    })
      .then(result => {
        const userChats = result.filter(row => {
          return row.users.some(user => user.id === req.userId)
        })
        return userChats
          .map(row => ({...row.dataValues, yourId: req.userId}))
      })
      .catch((e) => { throw Error(e) })
  }

  updateChatsNotifications(req) {
    if(req.body.update == 'owner') {
      return db.chats.update({
        owner_notified: true
      }, {
        where: {
          id: req.body.chatId
        }
      })
    }
    else {
      return db.chats.update({
        member_notified: true
      }, {
        where: {
          id: req.body.chatId
        }
      })
    }
  }
}

module.exports = new Chats