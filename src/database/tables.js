class Tables {

  init_posts(db) {

    this.db = db;
    this.create_posts();
    this.create_users();

  }

  create_posts() {
    this.db.run(`CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title text, 
      subtitle text, 
      description text
      )`,
      (err) => {
        console.log('A tabela post existe.')
      });
  }

  create_users() {
    this.db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text NOT NULL,
      password text NOT NULL,
      ra_code text NOT NULL,
      email text NOT NULL
    )`,
    (err) => {
      console.log('A tabela users existe.')
    });
  }

  create_profiles() {
    this.db.run(`CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text NOT NULL
    )`)
  }

  create_courses() {
    this.db.run(`CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text NOT NULL
    )`)
  }

}

module.exports = new Tables;