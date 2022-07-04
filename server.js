import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import postRoute from './routes/postRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRoute);
app.use(postRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT);