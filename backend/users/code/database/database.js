import sqlite3 from 'sqlite3';

const DBSOURCE = "./database/db.sqlite"

export let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')

    db.run(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL, 
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL`,
      (err) => {
        if (err) {
          console.error('Table users is already created');
        } else {
          let insert = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

          db.run(insert, ['johnDoe', 'john.doe@foo.bar', 'looney']);
        }
      });
  }
});