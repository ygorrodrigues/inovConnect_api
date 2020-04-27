const customExpress = require('./src/config/custom_express');
const app = customExpress();
const db = require('./src/models');

db.sequelize.sync({force: false}).then(() => {
  app.listen(3000, () => {
    console.log('Servidor online na porta 3000.');
  });
})