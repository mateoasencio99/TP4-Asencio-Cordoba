const { models } = require('../../sequelize');
const { getIdParam } = require('../helpers');
const { Op } = require('sequelize');
const { TicketState } = require('../../sequelize/enums/ticketState.enum'); 

async function getAll(req, res) {
	const userId = req.userId; 
	const tickets = await models.ticket.findAll({
		where: {
			userId: {
				[Op.eq]: userId
			}
		},
		include: [{
				model: models.event, // Incluye el modelo Event
				attributes: ['name'] // Solo selecciona el atributo 'name'
			}],
		order: [['purchaseDate', 'DESC']] 
	});
	res.status(200).json(tickets);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const order = await models.order.findByPk(id);
	if (order) {
		res.status(200).json(order);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
        const userId = req.userId; 
        for (const ticket of req.body.tickets) {
            newTicket = {
                name: ticket.nombre,
                lastName: ticket.apellido,
                dni: ticket.dni,
                purchaseDate: new Date(),
                eventId: req.body.eventId, 
				userId: userId,
				state: TicketState.PAID
            }
            await models.ticket.create(newTicket); 
        }
		res.status(200).json();
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
	// getById,
	create,
	// update,
	// remove,
	// addItem,
	// listItems
};