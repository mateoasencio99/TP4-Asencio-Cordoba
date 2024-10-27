function applyExtraSetup(sequelize) {
	const { category, country, event, location, person, province, ticket, user  } = sequelize.models;

	user.belongsTo(person);
	person.hasOne(user);

	ticket.belongsTo(person);
	person.hasMany(ticket);

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