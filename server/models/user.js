/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        role_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'role',
                key: 'id'
            }
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(1024),
            allowNull: true
        },
        active: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '0'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'user'
    });

    User.associate = function(models) {

        User.belongsTo(models.role, {
            foreignKey: 'id',
            as: 'user_role'
        });

    };

    return User;
};