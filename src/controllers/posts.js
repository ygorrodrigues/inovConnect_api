const Posts = require('../services/posts');
const Users = require('../services/users');

module.exports = app => {
  app.get('/posts', Users.authenticateToken, (req, res) => {
    Posts.list()
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(`${error}`)
      });
  });

  app.get('/posts/:id', Users.authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    Posts.searchId(id)
      .then(result => {
        res.status(200).send(result)
      })
      .catch((error) => {
        res.status(500).send(`${error}`)
      })
  });

  app.post('/posts', Users.authenticateToken, (req, res) => {
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

  app.patch('/posts/:id', Users.authenticateToken, (req, res) => {
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

  app.delete('/posts/:id', Users.authenticateToken, (req, res) => {
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