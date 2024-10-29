const { DataTypes } = require('sequelize');
const { TicketState } = require('../enums/ticketState.enum'); 

module.exports = (sequelize) => {
    sequelize.define('ticket', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        purchaseDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        maxCapacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        state: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            defaultValue: TicketState.PAID, 
            validate: {
                isIn: [[TicketState.PAID, TicketState.USED, TicketState.CANCELED]]
            }
        }
    });
}