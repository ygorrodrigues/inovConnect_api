module.exports = function(server){

  var io = require('socket.io').listen(server);

  io.on('connection', socket => {
    console.log('Entrou')
    chatId = socket.handshake.query.chatId
    socket.join(chatId)
      socket.on('disconnect', () => {
        socket.leave(chatId)
      })
      socket.on('send_message', msg => {
        created_at = msg.created_at,
        chatId = msg.chatId,
        userId = msg.userId,
        message = msg.message
        io.in(msg.chatId).emit('receive_message', {
          'data': [{
            'created_at': created_at,
            'chatId': chatId,
            'user': {
              'id': userId
            },
            'message': message
          }]
        })
      });
  });

  return io;
};