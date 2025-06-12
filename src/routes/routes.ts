import express from 'express';
import authRouter from './auth.routes';    
import userRouter from './user.routes';     
import bookRoutes from './books.routes';  
import reviewRoutes from './review.routes';

const mainRouter = express.Router();
mainRouter.use('/auth', authRouter);
mainRouter.use('/users', userRouter);
mainRouter.use('/book', bookRoutes);
mainRouter.use('/review', reviewRoutes);
export default mainRouter; 