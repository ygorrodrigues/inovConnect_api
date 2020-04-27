module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    title: {
      type: DataTypes.STRING,
      field: 'title'
    },
    subtitle: {
      type: DataTypes.STRING,
      field: 'subtitle'
    },
    description: {
      type: DataTypes.STRING,
      field: 'description'
    },
  }, 
  {
    freezeTableName: true,
    underscored: true,
    timestamps: false
  });

  posts.associate = models => {
    posts.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
  }

  return posts;
}