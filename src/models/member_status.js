module.exports = (sequelize, DataTypes) => {
    const member_status = sequelize.define('member_status', {
      name: {
        type: DataTypes.STRING(25),
        field: 'name'
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    });
  
    return member_status;
  }