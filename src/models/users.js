const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    password: {
      type: DataTypes.STRING,
      field: 'password'
    },
    raCode: {
      type: DataTypes.INTEGER,
      field: 'ra_code'
    },
    email: {
      type: DataTypes.STRING,
      field: 'email'
    },
  }, {
    freezeTableName: true,
    underscored: true,
  });

  users.associate = models => {
    users.hasMany(models.posts, {
      onDelete: 'cascade'
    });
  }

  return users;
}