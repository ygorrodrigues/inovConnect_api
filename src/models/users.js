module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      field: 'name',
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      field: 'password',
      allowNull: false
    },
    raCode: {
      type: DataTypes.INTEGER,
      field: 'ra_code',
      allowNull: false,
      unique: {
        args: true,
        msg: 'RA já está em uso'
      }
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
      validate: {
        isEmail: true,
        isUnisanta: function(value) {
          const regex = /@.*unisanta.br/
          let match = regex.exec(value)
          if(!match) {
            throw new Error('Somente email Unisanta autorizado!')
          }
        }
      },
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email já está em uso'
      }
    },
    photo: {
      type: DataTypes.STRING,
      field: 'photo'
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
  }

  return users;
}