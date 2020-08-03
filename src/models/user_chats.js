module.exports = (sequelize, DataTypes) => {
  const user_chats = sequelize.define('user_chats', {},
    {
      freezeTableName: false,
      timestamps: false
    });

  return user_chats;
}