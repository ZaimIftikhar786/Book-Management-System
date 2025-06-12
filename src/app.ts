import express, { Application, Request, Response, NextFunction } from "express";
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { errorHandler } from "./middleware/error_handler.middleware";
import { responseInterceptor } from "./middleware/response_interceptor.middleware";
import { authenticate } from './middleware/authenticate.middleware';

// Purane routes ke saath naye routes import karen
import routes from './routes/routes';
import bookRoutes from './routes/books.routes'; 
import reviewRoutes from './routes/review.routes';

const app: Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseInterceptor);
app.use(authenticate);
app.use('/', routes);
app.use('/books', bookRoutes); 
app.use('/', reviewRoutes);    

app.get('/health', (req: Request, res: Response) => {
    res.send('Book mnagament Backend is running');
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Route Not Found' });
});

app.use(errorHandler);

export default app;
