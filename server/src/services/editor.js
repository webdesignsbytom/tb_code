// server/services/editorService.js
export function handleCodeChange(socket, code) {
    // Broadcast the code change to all other clients
    socket.broadcast.emit('codeUpdate', code);
}
