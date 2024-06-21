const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Muestra todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.render('dashboard', { tasks });
  } catch (error) {
    console.error(error);
    res.render('dashboard', { error: 'Error al cargar las tareas' });
  }
});

// Muestra el formulario para crear una nueva tarea
router.get('/new', (req, res) => {
  res.render('newTask');
});

// Crea una nueva tarea
router.post('/new', async (req, res) => {
  const { title, description } = req.body;

  try {
    await Task.create(title, description);
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('newTask', { error: 'Error al crear la tarea' });
  }
});

// Muestra el formulario para editar una tarea
router.get('/edit/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    res.render('editTask', { task });
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
});

// Actualiza una tarea
router.post('/edit/:id', async (req, res) => {
  const taskId = req.params.id;
  const { title, description } = req.body;

  try {
    await Task.update(taskId, title, description);
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('editTask', { error: 'Error al actualizar la tarea' });
  }
});

// Elimina una tarea
router.get('/delete/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    await Task.delete(taskId);
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
});

module.exports = router;
