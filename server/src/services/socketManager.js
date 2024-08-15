export function initializeSocket(io) {
  io.on('connection', (socket) => {
    socket.on('message-send', (messageData) => {
      let res = {
        message: messageData,
        senderId: socket.id,
      };

      // socket.local.emit('message-receive', res);
      socket.broadcast.emit('message-receive', res);
      io.emit('message-receive', res);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}
