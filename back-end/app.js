import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import postRoutes from './routes/history-route.js';
import config from './utils/config.js'

const app = express();
app.use(cors());

app.use('/api', postRoutes);

mongoose
    .connect(config.MONGO_DB_LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(3001, () => {
            console.log("Server running on port 3001"); 
        });
    })
    .catch(err => {
        console.log(err);
    });