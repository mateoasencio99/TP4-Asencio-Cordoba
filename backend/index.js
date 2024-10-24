const app = require('./src/express/app.js');
const sequelize = require('./src/sequelize');
const PORT = 8080;

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
	await assertDatabaseConnectionOk();

    // sync models (create tables if they don't exist)
    await sequelize.sync();

	console.log(`Starting Sequelize + Express example on port ${PORT}...`);


    app.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}. Try some routes, such as '/api/users'.`);
	});

    const queryData = async () => {
        const Item = sequelize.models.item; // Accede al modelo de Producto

        // Realiza una consulta para obtener todos los productos
        const items = await Item.findAll();

        console.log(items); // Imprime los productos
    }

    //queryData();
}

init();