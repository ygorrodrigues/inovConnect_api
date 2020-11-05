var moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const chats = sequelize.define('chats', {
    created_at: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
      get: function () {
        return moment(this.getDataValue('created_at')).format('DD/MM/YYYY HH:mm')
      }
    },
    post_title: {
      type: DataTypes.STRING(50),
      field: 'post_title',
      allowNull: false,
    },
    owner_notified: {
      type: DataTypes.BOOLEAN,
      field: 'owner_notified',
      defaultValue: true
    },
    member_notified: {
      type: DataTypes.BOOLEAN,
      field: 'member_notified',
      defaultValue: false
    }
  },{
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })

  chats.associate = models => {
    chats.belongsToMany(models.users, {
      through: models.user_chats,
      as: 'users',
      foreignKey: 'chats_id'
    })
    chats.belongsTo(models.members, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return chats
}