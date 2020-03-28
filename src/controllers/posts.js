const Posts = require('../models/posts');
const Authentication = require('../models/authentication');

module.exports = app => {
  app.get('/posts', (req, resp) => {
    Posts.list(resp);
  });

  app.get('/posts/:id', Authentication.authenticateToken, (req, resp) => {
    const id = parseInt(req.params.id);

    Posts.searchId(id, resp);
  });

  app.post('/posts', Authentication.authenticateToken, (req, resp) => {
    const post = req.body;

    Posts.add(post, resp);
  });

  app.patch('/posts/:id', Authentication.authenticateToken, (req, resp) => {
    const id = parseInt(req.params.id);
    const dados = req.body;

    Posts.change(id, dados, resp);
  });

  app.delete('/posts/:id', Authentication.authenticateToken, (req, resp) => {
    const id = parseInt(req.params.id);

    Posts.delete(id, resp);
  });  

}