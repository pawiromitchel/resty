module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    date_created: DataTypes.DATE,
    date_updated: DataTypes.DATE,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.roles, {
      foreignKey: 'role_id'
    });
  };
  return User;
};
