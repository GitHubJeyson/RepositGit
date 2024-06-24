// config/db.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bd_sistemapedidos'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la database: ' + err.stack);
    return;
  }
  console.log('Conectando a la database.');
});

module.exports = connection;
