const Posts = require('../models/posts');
const users = require('../models/users');

module.exports = app => {
  app.get('/posts', users.authenticateToken, (req, resp) => {
    Posts.list(resp);
  });

  app.get('/posts/:id', users.authenticateToken, (req, resp) => {
    const id = parseInt(req.params.id);
    Posts.searchId(id, resp);
  });

  app.post('/posts', users.authenticateToken, (req, resp) => {
    Posts.add(req, resp);
  });

  app.patch('/posts/:id', users.authenticateToken, (req, resp) => {
    const id = parseInt(req.params.id);
    Posts.change(id, req.body, resp);
  });

  app.delete('/posts/:id', users.authenticateToken, (req, resp) => {
    const id = parseInt(req.params.id);
    Posts.delete(id, resp);
  });

}