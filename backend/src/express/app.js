const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../sequelize/models/user.model'); // Modelo de Sequelize para User
const { authenticateToken } = require('./middleware/authMiddleware'); // Middleware personalizado

const routes = {
    configurations: require('./routes/configurations'),
    events: require('./routes/event'),
    countries: require('./routes/country'),
    provinces: require('./routes/province'),
    locations: require('./routes/location'),
    categories: require('./routes/category'),
    users: require('./routes/user'),
    tickets: require('./routes/ticket'),
};

const app = express();
const JWT_SECRET = 'appeventos1234@';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function makeHandlerAwareOfAsyncErrors(handler) {
    return async function(req, res, next) {
        try {
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    };
}

// Rutas de autenticación
app.post('/api/register', async (req, res) => {
    try {
        routes.users.create(req, res)
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Registration Error:", error.message); // Esto te ayudará a depurar
        res.status(400).json({ error: error.message }); // Env
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const user = await routes.users.getByUserNameAndPassword(req, res);
        
        if (!user) return res.status(404).json({ error: 'User not found' });

        const token = jwt.sign({ id: user.id, email: user.userName }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ error: 'Login error' });
    }
});

app.get("/api/verify-token", (req, res) => {
    const token = req.headers["authorization"];
  
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: err });
      }
      // Token válido
      res.status(200).json({ message: "Token valid", user: decoded });
    });
  });

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
            authenticateToken,
            makeHandlerAwareOfAsyncErrors(routeController.create)
        );
    }
    if (routeController.update) {
        app.put(
            `/api/${routeName}/:id`,
            authenticateToken,
            makeHandlerAwareOfAsyncErrors(routeController.update)
        );
    }
    if (routeController.remove) {
        app.delete(
            `/api/${routeName}/:id`,
            authenticateToken,
            makeHandlerAwareOfAsyncErrors(routeController.remove)
        );
    }
}

app.get(`/api/upcomingEvents`,
    makeHandlerAwareOfAsyncErrors(routes.events.upcomingEvents)
);

app.get(`/api/userTickets`,
    authenticateToken,
    makeHandlerAwareOfAsyncErrors(routes.tickets.getAll)
);

module.exports = app;
