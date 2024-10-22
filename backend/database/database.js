const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'db.sqlite',
	logQueryParameters: true,
	benchmark: true
});

const modelDefiners = [
	// require('./models/category.model'),
	// require('./models/item.model'),
	// require('./models/order.model'),
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
// for (const modelDefiner of modelDefiners) {
// 	modelDefiner(sequelize);
// }

// We execute any extra setup after the models are defined, such as adding associations.
// applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;