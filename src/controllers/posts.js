const Posts = require('../models/posts');
const Users = require('../models/users');

module.exports = app => {
  app.get('/posts', Users.authenticateToken, (req, resp) => {
    Posts.list(resp);
  });

  app.get('/posts/:id', Users.authenticateToken, (req, resp) => {
    const id = parseInt(req.params.id);
    Posts.searchId(id, resp);
  });

  app.post('/posts', Users.authenticateToken, (req, resp) => {
    Posts.add(req, resp);
  });

  app.patch('/posts/:id', Users.authenticateToken, (req, resp) => {
    const id = parseInt(req.params.id);
    Posts.change(id, req.body, resp);
  });

  app.delete('/posts/:id', Users.authenticateToken, (req, resp) => {
    const id = parseInt(req.params.id);
    Posts.delete(id, resp);
  });

}