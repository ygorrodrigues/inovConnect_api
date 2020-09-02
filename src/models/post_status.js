module.exports = (sequelize, DataTypes) => {
  const post_status = sequelize.define('post_status', {
    name: {
      type: DataTypes.STRING(25),
      field: 'name'
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  });

  return post_status;
}