module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    name: {
      type: DataTypes.STRING(25),
      field: 'name',
      allowNull: false,
      unique: {
        args: true,
        msg: 'Digite uma categoria não existente'
      },
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
      foreignKey: 'categories_id'
    })
  }

  return categories;
}