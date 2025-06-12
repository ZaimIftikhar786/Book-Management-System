import mongoose, { Schema, Types, Document } from 'mongoose';

export interface IReview  {
    comment: string;
    rating: number;
    user: Types.ObjectId;
    book: Types.ObjectId;
}

const ReviewSchema: Schema = new Schema({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model<IReview>('Review', ReviewSchema);
