// productosModel.js

const db = require('../config/db');


//crear un modelo para el usuario
//crear un modelo para el usuario
// const User = {};

// User.create = (username, password, callback) => {
//   db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
//       if (err) return callback(err);
//       return callback(null, result.insertId);
//   });
// };

// User.findByUsername = (username, callback) => {
//   db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
//       if (err) return callback(err);
//       if (results.length > 0) {
//           return callback(null, results[0]);
//       } else {
//           return callback(null, null);
//       }
//   });
// };





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
// module.exports = User;