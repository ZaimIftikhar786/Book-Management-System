import { Request, Response, NextFunction } from 'express';
import Review from '../model/review.model';
import Book from '../model/book.model';

// Sab se aasan function signature istemal kiya hai taake koi confusion na ho.
export const addReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId } = req.params;
        const { comment, rating } = req.body;
        const userId = res.locals.user;

        if (!userId) {
            res.status(401).json({ message: "Login Required" });
        }

        const book = await Book.findById(bookId);

        if (!book) {
            res.status(404).json({ message: "Book not Found" });
        }
        
        if (book?.createdBy) {
            if (book.createdBy.toString() === userId.toString()) {
             res.status(403).json({ message: "You can't review your own book" });
            }
        }
        const newReview = new Review({
            comment,
            rating,
            book: bookId,
            user: userId
        });

        await newReview.save();

        if (!book?.reviews) {
            book!.reviews = [];
        }

        book?.reviews.push(newReview._id);
        await book?.save();


        res.status(201).json({ message: "Review added Successfully", review: newReview });

    } catch (error) {
        next(error);
    }
}
