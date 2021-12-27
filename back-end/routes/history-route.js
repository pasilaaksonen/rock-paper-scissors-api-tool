import express from 'express';
import { getHistory } from '../controllers/history-controller.js';
import { updateHistory } from '../controllers/update-controller.js';
import { fetchHistory } from '../controllers/fetch-controller.js';

const router = express.Router();

router.get('/history', getHistory);
router.get('/update-history', updateHistory);
router.get('/get-history', fetchHistory)

export default router;