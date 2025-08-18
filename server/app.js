import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
config({ path: './config/config.env' });
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { dbConnection } from './database/db.js';
import userRouter from './routes/user.routes.js';
import messageRouter from './routes/message.routes.js';

const app = express();

config({ path: './config.env' });


app.use(cors({

    origin: [https://convoapplication.netlify.app],
    credentials: true,
    method:["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

dbConnection();
export default app;    
