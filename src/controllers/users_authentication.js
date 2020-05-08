const UsersAuth = require('../services/users_authentication');

module.exports = app => {
  app.post('/users/login', (req, res) => {
    UsersAuth.createToken(req)
      .then(response => {
        if (response.auth == true) {
          res.status(200).json(response)
        } else {
          res.status(403).json(response)
        }
      })
      .catch(error => {
        res.status(500).send(`${error}`)
      })
  });

  app.post('/users/register', (req, res) => {
    UsersAuth.register(req)
      .then(response => {
        res.status(200).send(response)
      })
      .catch(error => {
        res.status(500).send(`${error}`)
      })
  });

  app.get('/confirmation/:token', (req, res) => {
    UsersAuth.confirmEmail(req.params.token)
      .then(response => {
        res.status(200).send(response)
      })
      .catch(error => {
        res.status(500).send(`${error}`)
      })
  });

  app.post('/resetpass', (req, res) => {
    UsersAuth.resetPassword(req)
      .then(response => {
        res.status(200).send(response)
      })
      .catch(error => {
        res.status(500).send(`${error}`)
      })
  })

  app.get('/resetpass/:token', (req, res) => {
    res.render('reset_pwd')
  })

  app.post('/resetpass/:token', (req, res) => {
    UsersAuth.changePassword(req)
      .then(response => {
        res.render('reset_pwd_finish', { message: response })
      })
      .catch(error => {
        res.render('reset_pwd_finish', { message: error })
      })
  })
}