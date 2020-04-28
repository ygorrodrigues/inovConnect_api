module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    title: {
      type: DataTypes.STRING(50),
      field: 'title'
    },
    subtitle: {
      type: DataTypes.STRING(50),
      field: 'subtitle'
    },
    description: {
      type: DataTypes.TEXT,
      field: 'description'
    }
  }, 
  {
    freezeTableName: true,
    underscored: true,
    timestamps: true
  });

  posts.associate = models => {
    posts.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
    posts.belongsTo(models.status, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return posts;
}