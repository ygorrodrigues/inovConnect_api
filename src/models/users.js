module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    password: {
      type: DataTypes.STRING,
      field: 'password'
    },
    raCode: {
      type: DataTypes.INTEGER,
      field: 'ra_code'
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
      validate: {
        isEmail: true
      }
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      field: 'confirmed',
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: true
  });

  users.associate = models => {
    users.hasMany(models.posts, {
      onDelete: 'cascade'
    });
    users.belongsTo(models.courses, {
      foreignKey: {
        allowNull: false
      }
    });
    users.belongsTo(models.photos, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return users;
}