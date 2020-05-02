module.exports = (sequelize, DataTypes) => {
  const post_categories = sequelize.define('post_categories', {},
    {
      freezeTableName: true,
      timestamps: false
    });

  return post_categories;
}