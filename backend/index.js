const express = require('express');
const { connectDB } = require('./database/database')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
connectDB();


// Definir una ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola Mundo!');
});

app.post('/auth', async (req, res) => {
    const { UserName, Password } = req.body;

    try {
        if (usuario) {
            res.status(200).json({ message: 'Usuario autenticado', user: usuario });
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al autenticar el usuario' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});