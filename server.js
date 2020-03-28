const customExpress = require('./src/config/custom_express');
const app = customExpress();

app.listen(3000, () => {
  console.log('Servidor online na porta 3000.');
});