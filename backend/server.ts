import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
dotenv.config();
connectDB()

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})