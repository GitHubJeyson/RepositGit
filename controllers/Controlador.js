
const Producto = require('../models/Modelos');
const bcrypt = require('bcryptjs');

// //controlador del registro

// exports.showRegisterForm = (req, res) => {
//   res.render('register');
// };

// exports.registerUser = (req, res) => {
//   const { username, password } = req.body;

//   // Hash de la contraseña
//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//       if (err) throw err;

//       // Guardar usuario en la base de datos
//       User.create(username, hashedPassword, (err, newUser) => {
//           if (err) {
//               res.render('register', { error: 'Error al registrar usuario' });
//           } else {
//               res.redirect('/login');
//           }
//       });
//   });
// };



// //controlador del login

// exports.showLoginForm = (req, res) => {
//   res.render('login');
// };

// exports.loginUser = (req, res) => {
//   const { username, password } = req.body;

//   // Buscar usuario en la base de datos
//   User.findByUsername(username, (err, user) => {
//       if (err || !user) {
//           res.render('login', { error: 'Nombre de usuario o contraseña incorrectos' });
//       } else {
//           // Verificar contraseña
//           bcrypt.compare(password, user.password, (err, result) => {
//               if (result) {
//                   req.session.userId = user.id; // Guardar el id del usuario en la sesión
//                   res.redirect('/index'); // Redirigir al dashboard u otra página segura
//               } else {
//                   res.render('login', { error: 'Nombre de usuario o contraseña incorrectos' });
//               }
//           });
//       }
//   });
// };



//---------------------------------------------------------------------------------------

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
