const db = require('../database/connection');

class Posts{

  add(req, resp) {
    const data = {...req.body, 'user_id': req.userId};
    const params = [
      req.body.title,
      req.body.subtitle,
      req.body.description,
      req.userId
    ];
    console.log(params);
    const validTitle = req.body.title.length <= 100 && req.body.title.length > 0;
    const validSubtitle = req.body.subtitle.length > 0;
    const validNumberOfParams = params.length == Object.keys(data).length;
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
      },
      {
        nome: 'parametros',
        valido: validNumberOfParams,
        message: 'O número de parâmetros está incorreto!'
      }
    ];
    const erros = validations.filter(campo => !campo.valido)

    if(erros.length){
      resp.status(400).json(erros)
    } else {
      const insert = 'INSERT INTO posts (title, subtitle, description, user_id) VALUES (?,?,?,?)';
      db.run(insert, params, function (error) {
        if (error) {
          resp.status(400).json({"error": error.message});
          return;
        }
        data.id = this.lastID;
        resp.status(201).json({
          "message": "success",
          "data": data
        });
      })
    }
  }

  list(resp) {
    const select = 'SELECT * FROM posts';
    db.all(select, [], (error, rows) => {
      if(error) {
        resp.status(400).json({'error': error.message});
        return;
      } else {
        resp.status(200).json({
          'message': 'success',
          'data': rows
        })
      }
    });
  }

  searchId(id, resp) {
    const select = `SELECT * FROM posts WHERE post_id=${id}`;
    db.all(select, [], (error, result) => {
      if(error) {
        resp.status(400).json({'error': error.message});
        return;
      } 
      if(result != '') {
        const post = result[0]
        resp.status(200).json(post);
      } else {
        resp.status(404).json({'message': 'Não encontrado!'});
      }
    });
  }

  change(id, dados, resp) {
    const update = `UPDATE posts SET
      title = ?,
      subtitle = ?,
      description = ?
      WHERE post_id=?`;

    const data = {
      id: id,
      title: dados.title,
      subtitle: dados.subtitle,
      description: dados.subtitle
    }

    db.run(update, [
      dados.title,
      dados.subtitle,
      dados.description,
      id], (error) => {
        if(error) {
          resp.status(400).json({'error': error.message});
          return;
        }
        resp.status(200).json({
          'message': 'success',
          'changed': data
        })
    })
  }

  delete(id, resp) {
    const deleta = `DELETE FROM posts WHERE post_id=?`;

    db.run(deleta, [id], (error) => {
      if(error) {
        resp.status(400).json({'error': error.message});
        return;
      }
      resp.status(200).json({
        'message': 'deleted',
        'deletedId': id
      })
    })
  }
}

module.exports = new Posts;