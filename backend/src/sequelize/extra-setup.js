function applyExtraSetup(sequelize) {
	const { category, country, event, location, province, ticket, user  } = sequelize.models;

	ticket.belongsTo(user);
	user.hasMany(ticket);

	ticket.belongsTo(event);
	event.hasMany(ticket);

	event.belongsTo(category);
	category.hasMany(event);

	event.belongsTo(location);
	location.hasMany(event);

	location.belongsTo(province);
	province.hasMany(location);

	province.belongsTo(country);
	country.hasMany(province);
}

module.exports = { applyExtraSetup };