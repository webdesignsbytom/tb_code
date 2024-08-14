import { handleCodeChange } from '../services/editor.js'

export function initializeSocket(io) {
    io.on('connection', (socket) => {
        console.log('New user connected:', socket.id);

        socket.on('codeChange', (code) => {
            handleCodeChange(socket, code);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
}

