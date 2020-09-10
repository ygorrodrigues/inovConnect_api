module.exports = function(server){

  var io = require('socket.io').listen(server);

  io.on('connection', socket => {
    chatId = socket.handshake.headers.chatid
    socket.join(chatId)
      socket.on('disconnect', () => {
        socket.leave(chatId)
      })
      socket.on('send_message', msg => {
        msgJson = JSON.parse(msg)
        io.in(msgJson.chatId).emit('receive_message', msg)
      });
  });

  return io;
};