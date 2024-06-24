const express = require('express');
const router = express.Router();
const productController = require('../controllers/Controlador');

router.get('/index', productController.visualizarProductos);
router.get('/productos', productController.obtenerProductos);
router.post('/productos', productController.crearProducto);
router.put('/productos/:id', productController.actualizarProducto);
router.delete('/productos/:id', productController.eliminarProducto);

module.exports = router;
