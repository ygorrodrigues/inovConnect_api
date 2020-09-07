const customExpress = require('./src/config/custom_express');
const app = customExpress();
const db = require('./src/models');
const https = require('https');
const force = true;

db.sequelize.sync({force: force}).then(() => {
  // Require for dev tests
  if (force)
    require('./src/dev/dev');
  const PORT = process.env.PORT || 3000;
  const httpsServer = https.createServer(app)
  const server = httpsServer.listen(PORT, () => {
    console.log(`Servidor online na porta ${ PORT }.`);
  });
  const io = require('./src/socket')(server)
})