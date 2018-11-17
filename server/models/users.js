/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(1024),
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'roles',
        key: 'role_id'
      }
    },
    date_updated: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
      tableName: 'users'
    }
  );

  Users.associate = function (models) {
    // associations can be defined here
    Users.belongsTo(models.roles, {
      foreignKey: 'role_id'
    });
  };
  
  return Users;
};
