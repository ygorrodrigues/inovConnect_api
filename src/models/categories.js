module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    name: {
      type: DataTypes.STRING(25),
      field: 'name'
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  });

  categories.associate = models => {
    categories.belongsToMany(models.posts, {
      through: models.post_categories,
      as: 'posts',
      uniqueKey: 'categories_id'
    })
  }

  return categories;
}