const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(methodOverride('_method'));

// Configuración de sesiones
app.use(session({
    secret: 'supersecret', // Secreto para firmar la cookie de sesión
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Cambiar a true en producción con HTTPS
}));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static('public'));

// Establecer vistas
app.set('view engine', 'ejs');
app.set('views', './views');

// Configurar Express para servir archivos estáticos desde el directorio 'public'
app.use(express.static('public/images'));

// Rutas
const routes = require('./routes/rutas');
app.use('/',routes);
//
// const registerRoutes = require('./routes/registerRoutes');
// const loginRoutes = require('./routes/loginRoutes');
// app.use(registerRoutes);
// app.use(loginRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
