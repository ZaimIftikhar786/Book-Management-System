import { Router } from 'express';
import { addReview } from '../controllers/review.controllers';
import { authenticate } from '../middleware/authenticate.middleware';

const router = Router();


router.post('/:bookId/reviews', addReview);


export default router;
