import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';
import path from 'path';
import { error } from 'console';

dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || " ";
//connect to db
mongoose
    .connect(MONGODB_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
        app.listen(PORT,async ()=> {
            console.log(`Server Running on http://localhost:${PORT}`);
        } );    
    })
    .catch((err)=>{
        console.error("Failed to Connect to MongoDb",err);
        process.exit(1);
    })
