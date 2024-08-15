import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  socketOptions: {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:3000/socket'], // Allow connections from localhost:3000
      methods: ['GET', 'POST'],
      credentials: true
    },
  },
};
