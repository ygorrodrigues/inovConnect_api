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
    }
  }, 
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true
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