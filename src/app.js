const express = require('express'); // Importamos la librería express
const productsRoutes = require('./Routes/productsRoutes');

const app = express(); // Creamos una instancia de express

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRoutes)

// Inicia el servidor en el puerto 8080
app.listen(8080, () => {
  console.log('Server running on port 8080'); // Muestra un mensaje en la consola cuando el servidor se inicia correctamente
});