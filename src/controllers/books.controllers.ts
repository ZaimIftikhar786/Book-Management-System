import { Request, Response, NextFunction } from "express";
import Book from '../model/book.model';
import { count } from "console";
import ReviewResponseDto from "../dto/response/review.static.dto";


export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, author, publishedDate, data } = req.body;
        const userId = res.locals.user;

        if (!userId) {
            res.status(401).json({ message: 'Authentication Required' });
        }

        const existingBook = await Book.findOne({ title: title, author: author });
        if (existingBook) {
            res.status(409).json({ message: 'Book Already exsits' });
        }

        const newBook = new Book({
            title,
            author,
            publishedDate,
            data,
            createdBy: userId
        });

        await newBook.save();
        res.status(201).json({ message: 'Book created successfully', book: newBook });

    } catch (err) {
        next(err); // Error ko aage errorHandler ke paas bhej den
    }
}

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, author, publishedDate, data } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, publishedDate, data },
            { new: true }
        );
        if (!updatedBook) {
            res.status(404).json({ message: 'Book not Found' })
        }
        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    }
    catch (error) {
        next(error); // Error ko aage errorHandler ke paas bhej den
    }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            res.status(404).json({ message: 'Book not Found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        next(error); // Error ko aage errorHandler ke paas bhej den
    }
};

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const booksFromDb = await Book.aggregate([
            { $lookup: { from: "reviews", localField: "_id", foreignField: "book", as: "reviewData" } },
            { $unwind: { path: "$reviewData", preserveNullAndEmptyArrays: true } },
            { $lookup: { from: "users", let: { userId: "$reviewData.user" }, pipeline: [ { $match: { $expr: { $eq: ["$_id", "$$userId"] } } }, { $project: { email: 1, name: 1 } } ], as: "reviewData.user" } },
            { $unwind: { path: "$reviewData.user", preserveNullAndEmptyArrays: true } },
            { $group: { _id: "$_id", doc: { $first: "$$ROOT" }, reviews: { $push: "$reviewData" } } },
            { $lookup: { from: "users", localField: "doc.createdBy", foreignField: "_id", as: "creatorInfo" } },
            { $unwind: { path: "$creatorInfo", preserveNullAndEmptyArrays: true } },

            {
                $project: {
                    _id: 0, 
                    id: "$_id",
                    title: "$doc.title",
                    author: "$doc.author",
                    publishedDate: "$doc.publishedDate",
                    createdAt: "$doc.createdAt",
                    updatedAt: "$doc.updatedAt",
                    createdBy: {
                        id: "$creatorInfo._id",
                        name: "$creatorInfo.name"
                    },

                    reviewSection: {
                        overallRating: { $ifNull: [{ $avg: "$reviews.rating" }, 0] },
                        reviewCount: { $cond: { if: { $first: "$reviews._id" }, then: { $size: "$reviews" }, else: 0 } },
                        reviews: {
                            $map: {
                                input: "$reviews",
                                as: "review",
                                in: {
                                    id: "$$review._id",
                                    comment: "$$review.comment",
                                    rating: "$$review.rating",
                                    user: {
                                        id: "$$review.user._id",
                                        name: "$$review.user.name",
                                        email: "$$review.user.email"
                                    }
                                }
                            }
                        }
                    }
                }
            }

        ]);
        const finalResponse = booksFromDb.map(book => {
            return book ;
        });
        
        new ReviewResponseDto(res, finalResponse)

    } catch (error) {
        next(error);
    }
};
