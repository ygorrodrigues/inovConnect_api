const db = require('../models');

class UsersProfile {
  list(req) {
    return db.users.findAll({
      where: {
        id: req.userId
      },
      attributes: ['name', 'raCode', 'email']
    })
      .then(result => { return result })
      .catch(error => { throw Error });
  }
}

module.exports = new UsersProfile;