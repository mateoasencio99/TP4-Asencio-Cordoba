const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');
const bcrypt = require('bcryptjs');

async function getAll(req, res) {
	const categories = await models.category.findAll();
	res.status(200).json(categories);
};

async function getByUserNameAndPassword(req, res) {
	const userName = req.body.email;
    const password = req.body.password; // Contraseña sin hash del cuerpo de la solicitud

    // Buscar el usuario solo por el userName
    const user = await models.user.findOne({
        where: { userName: userName }
    });

    if (user) {
        // Comparar la contraseña proporcionada con la almacenada en el usuario
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (isPasswordValid) {
            return user; // Devolver el usuario si la contraseña es válida
        }
    }

    // Si el usuario no existe o la contraseña no coincide, devolver null
    return null;
};

async function create(req, res) {
    const userName = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    const isAdmin = false;
    try {
        // Aquí se crea el usuario en la base de datos
        await models.user.create({ userName, password, isAdmin });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error("Create User Error:", error.message);
        throw error; // Lanza el error para que el manejador de errores lo capture
    }
};

async function update(req, res) {
	const id = getIdParam(req);

	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		await models.order.update(req.body, {
			where: {
				id: id
			}
		});
		res.status(200).end();
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function remove(req, res) {
	const id = getIdParam(req);
	await models.order.destroy({
		where: {
			id: id
		}
	});
	res.status(200).end();
};

async function addItem(req, res) {
	const orderId = getIdParam(req);
	const order = await models.order.findByPk(orderId);
	if (!order) {
		res.status(404).send('404 - Not found');
		return;
	}

	const itemId = req.body.itemId;
	console.log(req.body)
	const item = await models.item.findByPk(itemId);
	if (!item) {
		res.status(400).send('400 - Bad request: item not found');
		return;
	}

	await order.addItem(item);
	res.status(201).end();
	
};

async function listItems(req, res) {
	const orderId = getIdParam(req);
	const order = await models.order.findByPk(orderId, {
		include: {
			model: models.item,
			as: 'items'
		}
	});
	if (order) {
		res.status(200).json(order.items);
	} else {
		res.status(404).send('404 - Not found');
	}
}

module.exports = {
	getAll,
	getByUserNameAndPassword,
	create,
	// update,
	// remove,
	// addItem,
	// listItems
};