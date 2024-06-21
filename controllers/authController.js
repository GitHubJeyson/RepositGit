const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Renderiza el formulario de registro
router.get('/register', (req, res) => {
  res.render('register');
});

// Procesa el formulario de registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne(username);
    if (existingUser) {
      return res.render('register', { error: 'El nombre de usuario ya está en uso' });
    }

    // Cifra la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el usuario en la base de datos
    await User.create(username, hashedPassword);

    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.render('register', { error: 'Error al registrar el usuario' });
  }
});

// Renderiza el formulario de inicio de sesión
router.get('/login', (req, res) => {
  res.render('login');
});

// Procesa el formulario de inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Busca al usuario en la base de datos
    const user = await User.findOne(username);
    if (!user) {
      return res.render('login', { error: 'Credenciales inválidas' });
    }

    // Compara las contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { error: 'Credenciales inválidas' });
    }

    // Guarda la sesión del usuario
    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'Error al iniciar sesión' });
  }
});

// Cierra la sesión del usuario
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});






// Renderiza el formulario de inicio de sesión
router.get('/login', (req, res) => {
    res.render('login');
  });
  
  // Procesa el formulario de inicio de sesión
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Busca al usuario en la base de datos
      const user = await User.findOne(username);
      if (!user) {
        return res.render('login', { error: 'Credenciales inválidas' });
      }
  
      // Compara las contraseñas
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.render('login', { error: 'Credenciales inválidas' });
      }
  
      // Guarda la sesión del usuario
      req.session.user = user;
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.render('login', { error: 'Error al iniciar sesión' });
    }
  });
  
  // Cierra la sesión del usuario
  router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
  });
  

module.exports = router;
