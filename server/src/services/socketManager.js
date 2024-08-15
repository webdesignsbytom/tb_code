export function initializeSocket(io) {
  console.log('Socket.IO initialized');
  io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    socket.emit('message-receive', {
      message: 'Welcome to the chat!',
      senderId: 'Server',
    });

    socket.on('message-send', (messageData) => {
      let res = {
        message: messageData.message,
        senderId: socket.id,
      }

      // Send to other person
      // socket.local.emit('message-receive', res);
      socket.broadcast.emit('message-receive', res);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}
