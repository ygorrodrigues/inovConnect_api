module.exports = (sequelize, DataTypes) => {
  const types = sequelize.define('types', {
    name: {
      type: DataTypes.STRING(50),
      field: 'name'
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  });

  return types;
}