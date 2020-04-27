const Posts = require('../services/posts');
const Users = require('../services/users');

module.exports = app => {
  app.get('/posts', Users.authenticateToken, (req, res) => {
    Posts.list(res);
  });

  app.get('/posts/:id', Users.authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    Posts.searchId(id, res);
  });

  app.post('/posts', Users.authenticateToken, (req, res) => {
    Posts.add(req, res);
  });

  app.patch('/posts/:id', Users.authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    Posts.change(id, req.body, res);
  });

  app.delete('/posts/:id', Users.authenticateToken, (req, res) => {
    const id = parseInt(req.params.id);
    Posts.delete(id, res);
  });

}