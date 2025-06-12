import mongoose, { Schema, model, Types } from 'mongoose';
import { ref } from 'process';
export interface IBook {
title: string;
author: string;
publishedDate: Date;
data: string;
reviews: Types.ObjectId[]; 
createdBy: Types.ObjectId;
}
const BookSchema: Schema = new Schema({
title: { type: String, required: true },
author: { type: String, required: true },
createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
publishedDate: { type: Date, required: true },
}, {
timestamps: true
});
BookSchema.index({ title: 1, author: 1 }, { unique: true });
export default mongoose.model<IBook>('Book',BookSchema);