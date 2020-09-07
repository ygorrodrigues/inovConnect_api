require('dotenv').config();
module.exports = {
  "development": {
    "username": "postgres",
    "password": process.env.POSTGRES_PASSWORD,
    "database": "inovconnect",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5558
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "username": "ijmtyovzvdwtsc",
    "password": process.env.HEROKU_PASSWORD,
    "database": "d33kruh4vi996u",
    "host": "ec2-3-215-207-12.compute-1.amazonaws.com",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}
