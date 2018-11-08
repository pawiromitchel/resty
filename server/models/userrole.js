module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('roles', {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
  }, {});
  UserRole.associate = function(models) {
    // associations can be defined here
    UserRole.hasOne(models.users, {
      foreignKey: 'role_id'
    });
  };
  return UserRole;
};
