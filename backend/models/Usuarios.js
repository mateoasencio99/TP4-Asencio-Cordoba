const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Usuario extends Model {}
Usuario.init({
    UserName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    IsAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, { sequelize, modelName: 'usuario' });

module.exports = Usuario;
