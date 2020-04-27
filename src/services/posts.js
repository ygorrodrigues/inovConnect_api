const db = require('../models');

class Posts{

  add(req, res) {
    const validTitle = req.body.title.length <= 100 && req.body.title.length > 0;
    const validSubtitle = req.body.subtitle.length > 0;
    const validations = [
      {
        nome: 'title',
        valido: validTitle,
        message: 'O título precisa ter menos de 100 caracteres e não pode ser nulo.'
      },
      {
        nome: 'subtitle',
        valido: validSubtitle,
        message: 'O subtítulo não pode estar vazio!'
      }
    ];
    const erros = validations.filter(campo => !campo.valido)

    if(erros.length){
      res.status(400).json(erros)
    } else {
      db.posts.create({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        userId: req.userId
      })
      .then(newPost => {
        res.status(200).send(newPost);
      })
      .catch(error => {
        res.status(400).send(error);
      })
    }
  }

  list(res) {
    db.posts.findAll()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(error => {
      res.status(404).send(error);
    });
  }

  searchId(id, res) {
    db.posts.findAll({
      where: {
        id: id
      }
    })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(error => {
      res.status(404).send(error);
    });
  }

  change(id, data, res) {
    db.posts.update(
      {title: data.title},
      {where: {id: id}}
    )
    .then(() => {
      res.status(200).json({
        'message': `${id} atualizado com sucesso.`,
        'data': data
      });
    })
    .catch(error => {
      res.status(400).send(error);
    });
  }

  delete(id, res) {
    db.posts.destroy({
      where: {
        id: id
      }
    })
    .then(() => {
      res.status(200).send(`${id} deletado com sucesso.`)
    })
    .catch(error => {
      res.status(400).send(error);
    });
  }
}

module.exports = new Posts;