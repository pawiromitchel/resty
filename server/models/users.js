module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
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
  Users.associate = function(models) {
    // associations can be defined here
    Users.belongsTo(models.roles, {
      foreignKey: 'role_id'
    });
  };
  return Users;
};
