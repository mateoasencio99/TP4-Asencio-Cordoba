const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('configurations', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        key: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
}