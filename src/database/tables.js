class Tables {

  init_posts(db) {

    this.db = db;
    this.create_posts();

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

}

module.exports = new Tables;