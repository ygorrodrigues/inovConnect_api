var moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    title: {
      type: DataTypes.STRING(50),
      field: 'title',
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Digite um título'
        }
      }
    },
    description: {
      type: DataTypes.STRING(400),
      field: 'description',
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Digite uma descrição'
        }
      }
    },
    created_at: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
      get: function () {
        return moment(this.getDataValue('created_at')).format('DD/MM/YYYY HH:mm')
      }
    },
    updated_at: {
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: DataTypes.NOW,
      get: function () {
        return moment(this.getDataValue('updated_at')).format('DD/MM/YYYY HH:mm')
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
    posts.belongsTo(models.post_status, {
      foreignKey: {
        allowNull: false
      }
    });
    posts.belongsToMany(models.categories, {
      through: models.post_categories,
      as: 'categories',
      foreignKey: 'posts_id'
    });
    posts.belongsTo(models.types, {
      foreignKey: {
        allowNull: false,
        validate: {
          min: {
            args: 1,
            msg: 'Escolha um tipo de publicação'
          }
        }
      },
    })
  }

  return posts;
}