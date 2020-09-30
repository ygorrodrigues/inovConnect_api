const customExpress = require('./src/config/custom_express');
const app = customExpress();
const db = require('./src/models');
const http = require('http');
const force = false;

db.sequelize.sync({force: force}).then(() => {
  // Require for dev tests
  if (force)
    require('./src/dev/dev');
  const PORT = process.env.PORT || 3000;
  const httpServer = http.createServer(app)
  const server = httpServer.listen(PORT, () => {
    console.log(`Servidor online na porta ${ PORT }.`);
  });
  const io = require('./src/socket')(server)
})