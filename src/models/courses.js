module.exports = (sequelize, DataTypes) => {
  const courses = sequelize.define('courses', {
    name: {
      type: DataTypes.STRING(50),
      field: 'name'
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  });

  return courses;
}