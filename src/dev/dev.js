const db = require('../models');
var fs = require('fs');
const categories = require('../services/categories');
const Test = require('./creation')

console.log('Executing dev start')

db.post_status.create({ name: 'Ativo' })
db.post_status.create({ name: 'Bloqueado' })
db.post_status.create({ name: 'Concluído' })

db.categories.create({ name: 'Software' })
db.categories.create({ name: 'Hardware' })
db.categories.create({ name: 'Física' })
db.categories.create({ name: 'Química' })
db.categories.create({ name: 'Matemática' })
db.categories.create({ name: 'Fisioterapia' })

db.types.create({ name: 'Projeto' })
db.types.create({ name: 'Grupo de estudo' })
db.types.create({ name: 'Dúvida' })

db.member_status.create({ name: 'Pendente' })
db.member_status.create({ name: 'Em chat' })
db.member_status.create({ name: 'Aceito' })
db.member_status.create({ name: 'Recusado' })

Test.createGlobalPass()
  .then(pass => {
    db.courses.create({ name: 'Engenharia da computação ' })
    .then(r => {
      db.users.create({
        name: 'Ygor',
        password: pass,
        raCode: '1256',
        email: 'fon@unisanta.br',
        courseId: 1,
        confirmed: true
      })
    })

    db.courses.create({ name: 'Fisioterapia' })
      .then(r => {
        db.users.create({
          name: 'Marcos',
          password: pass,
          raCode: '12567',
          email: 'vish@alunos.unisanta.br',
          courseId: 2,
          confirmed: true
        })
      })

    db.courses.create({ name: 'Pedagogia' })
      .then(r => {
        db.users.create({
          name: 'João',
          password: pass,
          raCode: '125678',
          email: 'vishe@alunos.unisanta.br',
          courseId: 3,
          confirmed: true
        })
      })

    db.courses.create({ name: 'Matemática' })
      .then(r => {
        db.users.create({
          name: 'Pedro',
          password: pass,
          raCode: '135678',
          email: 'opa@alunos.unisanta.br',
          courseId: 4,
          confirmed: true
        })
      })

    db.courses.create({ name: 'Biologia' })
      .then(r => {
        db.users.create({
          name: 'Maria',
          password: pass,
          raCode: '135679',
          email: 'opar@alunos.unisanta.br',
          courseId: 5,
          confirmed: true
        })
      })
  })