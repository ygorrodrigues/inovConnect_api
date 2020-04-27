const db = require('../models');

class Posts {

  add(req) {
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

    if (erros.length) {
      console.log(erros);
      return erros
    } else {
      return db.posts.create({
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        userId: req.userId
      })
        .then(newPost => { return newPost })
        .catch(() => { throw Error })
    }
  }

  list() {
    return db.posts.findAll()
      .then(result => { return result })
      .catch(() => { throw Error });
  }

  searchId(id) {
    return db.posts.findAll({
      where: {
        id: id
      }
    })
      .then(result => { return result })
      .catch(() => { throw Error });
  }

  change(id, data) {
    return db.posts.update(
      { title: data.title },
      { where: { id: id } }
    )
      .then((result) => { return result })
      .catch(() => { throw Error });
  }

  delete(id) {
    return db.posts.destroy({
      where: {
        id: id
      }
    })
      .then((result) => { return result })
      .catch(() => { throw Error });
  }
}

module.exports = new Posts;