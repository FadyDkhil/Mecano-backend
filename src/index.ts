import 'reflect-metadata';
import * as dotenv from 'dotenv';

import cors from 'cors';
import express from 'express';
import { configureExpress } from './app/config/express';

dotenv.config();
console.log("Database URL:", process.env.DATABASE_URL);
const PORT = process.env.PORT || 9000;

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin === 'http://localhost:9000') {
            callback(null, true); 
        } else {
            callback(null, true); 
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const container = configureExpress(app);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        // await container.runSeeds();
        console.log('Seeding completed');
    } catch (error) {
        console.error('Seeding failed', error);
    }
});

export default app;