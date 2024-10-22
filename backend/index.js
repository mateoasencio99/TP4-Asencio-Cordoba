const express = require('express');
const cors = require('cors');
const { connectDB } = require('./database/database')
const Configurations = require('./models/Configurations'); // Importa el modelo

const app = express();
const PORT = 3001;

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Conectar a la base de datos
// connectDB();


// Definir una ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola Mundo!');
});

app.get('/configurations', async (req, res) => {
    res.json({
        nombre: 'nombre de organizador'
    });
    // try {
    //     const configurations = await Configurations.findAll();
    //     res.json({
    //         success: true,
    //         data: configurations
    //     });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({
    //         success: false,
    //         message: 'Error al obtener las configuraciones'
    //     });
    // }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});