import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import '../typeorm';
import routes from './routes';
import uploadConfig from '../../../config/upload';
import AppError from '../../errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      success: false,
      status: 'error',
      message: err.message
    });
  }
  console.error(err);
  return response.status(500).json({
    success: false,
    status: 'error',
    message: 'Internal server error'
  });

});

app.listen(3333, () => {
  console.log('✔ Server Running in Port 3333')
})
