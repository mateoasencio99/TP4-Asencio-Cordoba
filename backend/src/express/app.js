const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa cors

const routes = {
    configurations: require('./routes/configurations'),
    events: require('./routes/event'),
    countries: require('./routes/country'),
    provinces: require('./routes/province'),
    locations: require('./routes/location'),
    categories: require('./routes/category'),
};

const app = express();

// Usa CORS para permitir todas las rutas
app.use(cors()); // Si solo deseas permitir un origen específico, usa: cors({ origin: 'http://localhost:3000' })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Función para manejar errores asíncronos
function makeHandlerAwareOfAsyncErrors(handler) {
    return async function(req, res, next) {
        try {
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    };
}

// Definición de las rutas de la API
for (const [routeName, routeController] of Object.entries(routes)) {
    if (routeController.getAll) {
        app.get(
            `/api/${routeName}`,
            makeHandlerAwareOfAsyncErrors(routeController.getAll)
        );
    }
    if (routeController.getById) {
        app.get(
            `/api/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.getById)
        );
    }
    if (routeController.create) {
        app.post(
            `/api/${routeName}`,
            makeHandlerAwareOfAsyncErrors(routeController.create)
        );
    }
    if (routeController.update) {
        app.put(
            `/api/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.update)
        );
    }
    if (routeController.remove) {
        app.delete(
            `/api/${routeName}/:id`,
            makeHandlerAwareOfAsyncErrors(routeController.remove)
        );
    }
}

app.get(`/api/upcomingEvents`,
	makeHandlerAwareOfAsyncErrors(routes.events.upcomingEvents)
);

module.exports = app;
