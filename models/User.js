const db = require('../config/db');

class User {
  static findOne(username) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results[0]);
      });
    });
  }

  static create(username, password) {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}

module.exports = User;
