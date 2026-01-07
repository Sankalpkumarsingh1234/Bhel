import History from '../models/history.js';

export const logPrediction = async (req, res) => {
  try {
    console.log("LOGGING PREDICTION:", req.body);
    const { email, prediction } = req.body;
    const entry = new History({ email, prediction });
    await entry.save();
    res.status(201).json({ message: 'Prediction logged' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging prediction' });
  }
};

export const getHistory = async (req, res) => {
  try {
    const { email } = req.query;
    console.log("FETCHING HISTORY FOR:", email);
    const records = await History.find({ email }).sort({ timestamp: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching history' });
  }
};