import express from 'express';
import { getHistory, logPrediction } from '../controller/history.js';

const router = express.Router();

router.post('/log', logPrediction);
router.get('/', getHistory);

module.exports = router;




