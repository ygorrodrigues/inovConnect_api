module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      field: 'name',
      validate: {
        notEmpty: {
          args: true,
          msg: 'Digite o seu nome'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      field: 'password',
      validate: {
        notEmpty: {
          args: true,
          msg: 'Digite uma senha'
        }
      }
    },
    raCode: {
      type: DataTypes.INTEGER,
      field: 'ra_code',
      validate: {
        isInt: {
          args: true,
          msg: 'Digite um RA válido'
        },
      },
      unique: {
        args: true,
        msg: 'RA já está em uso'
      }
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
      validate: {
        isEmail: {
          args: true,
          msg: 'Insira um email válido'
        },
        isUnisanta: function(value) {
          const regex = /@.*unisanta.br/
          let match = regex.exec(value)
          if(!match) {
            throw new Error('Somente email Unisanta autorizado!')
          }
        }
      },
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
  })

  users.associate = models => {
    users.hasMany(models.posts, {
      onDelete: 'cascade'
    })
    users.belongsTo(models.courses, {
      foreignKey: {
        allowNull: false
      }
    })
    users.belongsToMany(models.chats, {
      through: models.user_chats,
      as: 'chats',
      foreignKey: 'users_id'
    })
  }

  return users
}