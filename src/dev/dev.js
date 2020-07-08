const db = require('../models');
var fs = require('fs');
const categories = require('../services/categories');

console.log('Executing dev start')

db.status.create({ name: 'Ativo' })
db.status.create({ name: 'Bloqueado' })
db.status.create({ name: 'Concluído' })

db.categories.create({ name: 'Software' })
db.categories.create({ name: 'Hardware' })
db.categories.create({ name: 'Física' })
db.categories.create({ name: 'Química' })
db.categories.create({ name: 'Matemática' })
db.categories.create({ name: 'Fisioterapia' })

db.types.create({ name: 'Projeto' })
db.types.create({ name: 'Grupo de estudo' })
db.types.create({ name: 'Dúvida' })

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
        categoriesOfPost = [1, 2]
        post.setCategories(categoriesOfPost)
      })
  })

db.courses.create({ name: 'Fisioterapia' })
  .then(r => {
    db.users.create({
      name: 'Marcos',
      password: 'kkkkj',
      raCode: '12567',
      email: 'vish@alunos.unisanta.br',
      courseId: 2
    })
      .then(async r => {
        const post = await db.posts.create({
          title: 'Teste dois',
          description: 'SIM SIM SIM NÃO',
          userId: 2,
          statusId: 1,
          typeId: 3
        })
        categoriesOfPost = [5, 1]
        post.setCategories(categoriesOfPost)
      })
  })

db.courses.create({ name: 'Pedagogia' })
  .then(r => {
    db.users.create({
      name: 'João',
      password: 'kkkkjj',
      raCode: '125678',
      email: 'vishe@alunos.unisanta.br',
      courseId: 3
    })
      .then(async r => {
        const post = await db.posts.create({
          title: 'Teste três',
          description: 'SIM SIM SIM NÃO NOPE',
          userId: 3,
          statusId: 1,
          typeId: 2
        })
        categoriesOfPost = [6]
        post.setCategories(categoriesOfPost)
      })
  })

db.courses.create({ name: 'Matemática' })
  .then(r => {
    db.users.create({
      name: 'Pedro',
      password: 'kkkkjjj',
      raCode: '135678',
      email: 'opa@alunos.unisanta.br',
      courseId: 4
    })
      .then(async r => {
        const post = await db.posts.create({
          title: 'Teste quatro',
          description: 'SIM SIM SIM NÃO NOPE HAHA',
          userId: 4,
          statusId: 1,
          typeId: 1
        })
        categoriesOfPost = [4, 2]
        post.setCategories(categoriesOfPost)
      })
  })

db.courses.create({ name: 'Biologia' })
  .then(r => {
    db.users.create({
      name: 'Maria',
      password: 'kkjjj',
      raCode: '135679',
      email: 'opar@alunos.unisanta.br',
      courseId: 5
    })
      .then(async r => {
        var i = 0;
        while(i < 10) {
          const post = await db.posts.create({
            title: 'SPAM',
            description: 'SIM SIM SIM',
            userId: 5,
            statusId: 1,
            typeId: 3
          })
          categoriesOfPost = [1]
          post.setCategories(categoriesOfPost)
          i++;
        }
      })
  })