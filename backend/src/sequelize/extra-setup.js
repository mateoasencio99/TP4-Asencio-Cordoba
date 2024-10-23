function applyExtraSetup(sequelize) {
	const { configurations } = sequelize.models;

	// item.belongsTo(category);
	// category.hasMany(item);
    // item.belongsToMany(order, { through: 'order_item' });
    // order.belongsToMany(item, { through: 'order_item' });
}

module.exports = { applyExtraSetup };