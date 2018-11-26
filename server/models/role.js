/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Role = sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    }, {
        tableName: 'role'
    });

    Role.associate = function(models) {

        Role.hasMany(models.user, {
            foreignKey: 'id'
        });

    };

    return Role;
};