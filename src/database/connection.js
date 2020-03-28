const sqlite3 = require('sqlite3').verbose();
const tabelas = require('./tables');

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }
    else {
        console.log('Connected to the SQLite database.')

        tabelas.init_posts(db);
    }
});

module.exports = db