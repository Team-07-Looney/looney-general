import sqlite3 from 'sqlite3';

const DBSOURCE = "./database/db.sqlite"

export let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')
    db.run(`CREATE TABLE habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL, 
      start_time TEXT, 
      duration INTEGER)`,
      (err) => {
        if (err) {
          console.error('Table habits is already created');
        } else {
          let insert = 'INSERT INTO habits (name, start_time, duration) VALUES (?,?,?)';
          db.run(insert, ["Brush teeth", "8:15", "30"]);
          db.run(insert, ["Take a shower", "8:05", "10"]);
        }
      });
  }
});
