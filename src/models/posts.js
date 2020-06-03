var moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    title: {
      type: DataTypes.STRING(50),
      field: 'title',
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      field: 'description',
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
      get: function () {
        return moment(this.getDataValue('created_at')).format('DD/MM/YYYY h:mm')
      }
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
  });

  posts.associate = models => {
    posts.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
    posts.belongsTo(models.status, {
      foreignKey: {
        allowNull: false
      }
    });
    posts.belongsToMany(models.categories, {
      through: models.post_categories,
      as: 'categories',
      uniqueKey: 'posts_id'
    });
    posts.belongsTo(models.types, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return posts;
}