module.exports = (sequelize, DataTypes) => {
  const photos = sequelize.define('photos', {
    name: {
      type: DataTypes.STRING(50),
      field: 'name'
    },
    image: {
      type: DataTypes.BLOB,
      field: 'image'
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  });

  return photos;
}