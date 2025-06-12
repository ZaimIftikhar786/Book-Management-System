import { Router } from 'express';
import { createBook, updateBook, deleteBook, getAllBooks } from '../controllers/books.controllers';

const router = Router();
router.post('/', createBook);
router.get('/', getAllBooks);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;