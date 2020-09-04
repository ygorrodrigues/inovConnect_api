const customExpress = require('./src/config/custom_express');
const app = customExpress();
const db = require('./src/models');
const force = true;

db.sequelize.sync({force: force}).then(() => {
  // Require for dev tests
  if (force)
    require('./src/dev/dev');
  const server = app.listen(3000, () => {
    console.log('Servidor online na porta 3000.');
  });
  const io = require('./src/socket')(server)
})