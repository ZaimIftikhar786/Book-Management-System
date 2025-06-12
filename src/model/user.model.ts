import { Schema, Types, model, Document } from 'mongoose';

export interface IUser{
  _id: Types.ObjectId; // _id is required for a Mongoose Document
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  // --- Fields for Email Verification ---
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  // ------------------------------------
}

const userSchema = new Schema<IUser>(
  {
    // --- Original Fields ---
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false }, // select: false is good practice
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true } 
);

export const User = model<IUser>('User', userSchema);