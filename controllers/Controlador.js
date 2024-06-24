// productosController.js

const Producto = require('../models/Modelos');

const visualizarProductos = (req, res) => {
  Producto.obtenerTodos((err, productos) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.render('index', { productos });
  });
};

const obtenerProductos = (req, res) => {
  Producto.obtenerTodos((err, productos) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.render('productos', { productos });
  });
};

const crearProducto = (req, res) => {
  const { imagen, nombre, descripcion, precio, estado } = req.body;
  const nuevoProducto = { imagen, nombre, descripcion, precio, estado };
  
  Producto.insertar(nuevoProducto, (err) => {
    if (err) {
      console.error('Error al crear producto:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.redirect('/productos');
  });
};

const actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { imagen, nombre, descripcion, precio, estado } = req.body;
  const productoActualizado = { imagen, nombre, descripcion, precio, estado };

  Producto.actualizar(id, productoActualizado, (err) => {
    if (err) {
      console.error('Error al actualizar producto:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.redirect('/productos');
  });
};

const eliminarProducto = (req, res) => {
  const { id } = req.params;

  Producto.eliminar(id, (err) => {
    if (err) {
      console.error('Error al eliminar producto:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    res.redirect('/productos');
  });
};

module.exports = {
  visualizarProductos,
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
