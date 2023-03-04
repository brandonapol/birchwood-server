import cors from 'cors'

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

export const options: cors.CorsOptions = {
  origin: allowedOrigins
};
