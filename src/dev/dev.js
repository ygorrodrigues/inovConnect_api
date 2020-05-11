const db = require('../models');
var fs = require('fs')

console.log('Executing dev start')

db.status.create({ name: 'Ativo' })
db.status.create({ name: 'Bloqueado' })
db.status.create({ name: 'Concluído' })

db.categories.create({ name: 'Software' })
db.categories.create({ name: 'Hardware' })
db.categories.create({ name: 'Física' })
db.categories.create({ name: 'Química' })

db.types.create({ name: 'Projeto' })
db.types.create({ name: 'Grupo de estudo' })

db.courses.create({ name: 'Engenharia da computação ' })
  .then(r => {
    db.users.create({
      name: 'Ygor',
      password: 'kkkk',
      raCode: '1256',
      email: 'fon@unisanta.br',
      courseId: 1
    })
      .then(async r => {
        const post = await db.posts.create({
          title: 'Teste',
          description: 'SIM SIM SIM',
          userId: 1,
          statusId: 1,
          typeId: 1
        })
        categories = [1, 2]
        post.setCategories(categories)
      })
  })