import dotenv from 'dotenv';
dotenv.config();

let MONGO_DB_LINK = process.env.MONGO_DB_LINK;

let config = {
    MONGO_DB_LINK,
};

export default config;