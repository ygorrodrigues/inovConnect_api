module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    title: {
      type: DataTypes.STRING(50),
      field: 'title',
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      field: 'description'
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
  }

  return posts;
}