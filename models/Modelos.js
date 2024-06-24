// productosModel.js

const db = require('../config');

// Modelo para manejar productos en la base de datos MySQL
const Producto = {};

Producto.obtenerTodos = (callback) => {
  db.query('SELECT * FROM productos', callback);
};

Producto.insertar = (nuevoProducto, callback) => {
  db.query('INSERT INTO productos SET ?', nuevoProducto, callback);
};

Producto.actualizar = (id, productoActualizado, callback) => {
  db.query('UPDATE productos SET ? WHERE id = ?', [productoActualizado, id], callback);
};

Producto.eliminar = (id, callback) => {
  db.query('DELETE FROM productos WHERE id = ?', id, callback);
};

module.exports = Producto;
