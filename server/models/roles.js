module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('roles', {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
  }, {});
  Roles.associate = function(models) {
    // associations can be defined here
    Roles.hasOne(models.users, {
      foreignKey: 'role_id'
    });
  };
  return Roles;
};
