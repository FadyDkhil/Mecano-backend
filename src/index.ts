import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import { configureExpress } from './app/config/express';
import * as v8 from 'node:v8';

const maxHeap = v8.getHeapStatistics().heap_size_limit;
function getPercentOfMaxHeapInUse() {
    return v8.getHeapStatistics().used_heap_size / maxHeap;
}


if (getPercentOfMaxHeapInUse() > 0.8) {
    console.log("OVER LIMIT")
}

const PORT = process.env.PORT || 9000;

const app = express();
app.use(cors());

const container = configureExpress(app);
container.catch((error) => {
    console.error('Error configuring express', error);
    process.exit(1);
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        console.log('Seeding completed');
    } catch (error) {
        console.error('Seeding failed', error);
    }
});
