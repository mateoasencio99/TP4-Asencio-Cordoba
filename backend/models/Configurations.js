const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database');

class Configurations extends Model {}
Configurations.init({
    Key: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: true
    },
    Value: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { sequelize, modelName: 'Configurations' });

module.exports = Configurations;