/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Roles = sequelize.define('roles', {
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: true
    }
  }, {
      tableName: 'roles'
    }
  );

  Roles.associate = function (models) {
    // associations can be defined here
    Roles.hasOne(models.users, {
      foreignKey: 'role_id'
    });
  };

  return Roles;
};
