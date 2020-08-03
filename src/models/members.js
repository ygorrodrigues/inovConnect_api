var moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const members = sequelize.define('members', {
    status_message: {
      type: DataTypes.STRING(100),
      field: 'status_message',
      allowNull: false,
      defaultValue: 'Avaliação pendente, aguarde.'
    },
    updated_at: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: DataTypes.NOW,
      get: function () {
        return moment(this.getDataValue('created_at')).format('DD/MM/YYYY h:mm')
      }
    }
  }, 
  {
    freezeTableName: true,
    underscored: true,
    timestamps: false
  })

  members.associate = models => {
    members.belongsTo(models.posts, {
      foreignKey: {
        allowNull: false
      }
    })
    members.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    })
    members.belongsTo(models.member_status, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return members
}