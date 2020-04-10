class Tables {

  init_posts(db) {

    this.db = db;
    this.create_posts();
    this.create_users();

  }

  create_posts() {
    this.db.run(`CREATE TABLE IF NOT EXISTS posts (
      post_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT, 
      subtitle TEXT, 
      description TEXT,
      status INTEGER,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id)
        REFERENCES users (user_id)
      )`,
      (err) => {
        console.log('A tabela post existe.')
      });
  }

  create_users() {
    this.db.run(`CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      ra_code TEXT NOT NULL,
      email TEXT NOT NULL
    )`,
    (err) => {
      console.log('A tabela users existe.')
    });
  }

  create_profiles() {
    this.db.run(`CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )`)
  }

  create_courses() {
    this.db.run(`CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )`)
  }

}

module.exports = new Tables;