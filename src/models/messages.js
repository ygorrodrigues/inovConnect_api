var moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define('messages', {
    message: {
      type: DataTypes.STRING(300),
      field: 'message'
    },
    created_at: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
      get: function () {
        return moment(this.getDataValue('created_at')).format('DD/MM/YYYY h:mm')
      }
    },
  }, 
  {
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })

  messages.associate = models => {
    messages.belongsTo(models.chats, {
      foreignKey: {
        allowNull: false
      }
    })
    messages.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return messages
}