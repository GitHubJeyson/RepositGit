const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const db = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(methodOverride('_method'));
// Configuración de sesiones
// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
// }));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static('public'));

// Establecer vistas
app.set('view engine', 'ejs');
app.set('views', './views');

// Configurar Express para servir archivos estáticos desde el directorio 'public'
app.use(express.static('public'));

// Rutas
const routes = require('./routes/rutas');
app.use('/',routes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
