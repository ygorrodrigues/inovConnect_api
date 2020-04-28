module.exports = (sequelize, DataTypes) => {
  const status = sequelize.define('status', {
    name: {
      type: DataTypes.STRING(25),
      field: 'name'
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  });

  return status;
}