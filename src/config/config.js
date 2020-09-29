require('dotenv').config();
module.exports = {
  "development": {
    "username": "postgres",
    "password": process.env.POSTGRES_PASSWORD,
    "database": "inovconnect",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5558,
    "dialectOptions": {
      "useUTC": false,
    },
    "timezone": "-3:00",
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
    "username": "gzlehifkythkzk",
    "password": process.env.HEROKU_PASSWORD,
    "database": "dcjmqsl44ibju1",
    "host": "ec2-34-232-212-164.compute-1.amazonaws.com",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      },
      "useUTC": false,
    },
    "timezone": "-03:00",
  }
}
