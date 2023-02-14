const ProductManager = require('../ProductManager'); // Importamos la clase ProductManager
const { Router } = require('express');
const fs = require("fs");

const router = Router();

const productManager = new ProductManager('./src/products.json'); // Creamos una instancia de ProductManager

// Define la ruta GET "/"
router.get('/', async (req, res) => {
    let products = await productManager.getProducts(); // Obtiene todos los productos a través de la clase ProductManager
    const limit = req.query.limit; // Obtiene el límite opcional desde la consulta
    if (limit) {
        products = products.slice(0, limit); // Limita la cantidad de productos si el límite fue especificado
    }
    res.json({ products }); // Devuelve los productos en formato JSON
});

// Define la ruta GET "/products/:pid"
router.get('/:pid', async (req, res) => {
    const pid = req.params.pid; // Obtiene el ID del producto desde los parámetros de la ruta
    const product = await productManager.getProductById(pid); // Obtiene el producto específico a través de la clase ProductManager
    if (product) { //Verificamos que el producto con el pid utilizado exista
        res.json({ product }); // Devuelve el producto en formato JSON
    } else { // Si no existe da un error y avisa que no existe
        res.status(404).json({ error: `Product with ID '${pid}' not found.` });
    }
});

router.post('/', async (req, res) => {
    
    res.send("post todo bien")
    const newProduct = await productManager.addProducts(req.body.title, req.body.description, req.body.price, req.body.code, req.body.status || true, req.body.stock, req.body.category, req.body.thumbnails);
    
    res.json({ newProduct });

})

module.exports = router