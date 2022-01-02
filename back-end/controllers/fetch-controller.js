import express from 'express';
import UserData from '../models/user-model.js'
import axios from 'axios';
const router = express.Router();

export const fetchHistory = async (req, res) => {
    UserData.find({}, (err, result) => {
        if (err) {
          res.send("Data not found");
        }
        // console.log(result[0].data)
        res.send(result[0]);
    });  
}

export default router;