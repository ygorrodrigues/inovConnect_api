const Posts = require('../services/posts');
const UsersAuth = require('../services/users_authentication');
const Categories = require('../services/categories');

module.exports = app => {
  app.get('/posts', UsersAuth.authenticateToken, (req, res) => {
    Posts.listAll()
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(`${error}`)
      });
  });

  app.get('/posts/filter', UsersAuth.authenticateToken, (req, res) => {
    const typeId = parseInt(req.query.type)
    const categoryId = parseInt(req.query.category)
    Posts.listFilteredPosts(typeId, categoryId)
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(error)
      })
  });

  app.get('/posts/id/:id', UsersAuth.authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    Posts.searchId(id)
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(`${error}`)
      })
  });

  app.post('/posts', UsersAuth.authenticateToken, (req, res) => {
    const response = Posts.add(req);
    if (typeof response.then === 'undefined') {
      res.status(400).send(response)
      return
    }
    response
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(`${error}`)
      })
  });

  app.post('/posts/new-category', UsersAuth.authenticateToken, (req, res) => {
    Categories.add(req.body.anotherCategory)
      .then((result) => {
        console.log(result.id)
        Posts.addAnotherCategory(req, result.id)
          .then(result => {
            res.status(200).send(result)
          })
          .catch((error) => {
            res.status(500).send(`${error}`)
          })
      })
  })

  app.patch('/posts/:id', UsersAuth.authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    Posts.change(id, req.body)
      .then((result) => {
        console.log(result)
        if (result[0])
          res.status(200).send(`${id} atualizado com sucesso`)
        else
          res.status(200).send('id não encontrado')
      })
      .catch((error) => {
        res.status(500).send(`${error}`)
      })
  });

  app.delete('/posts/:id', UsersAuth.authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    Posts.delete(id)
      .then((result) => {
        console.log(result)
        if (result)
          res.status(200).send(`${id} deletado com sucesso`)
        else
          res.status(200).send('id não encontrado')
      })
      .catch((error) => {
        res.status(500).send(`${error}`)
      })
  });

}