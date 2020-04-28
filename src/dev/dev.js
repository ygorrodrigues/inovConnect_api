const db = require('../models');

console.log('Executing dev start')

db.status.create({ name: 'Pendente' })
db.status.create({ name: 'Ativo' })
db.status.create({ name: 'Bloqueado' })
db.status.create({ name: 'Concluído' })