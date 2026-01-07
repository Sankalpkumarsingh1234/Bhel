import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  email: String,
  prediction: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('History', historySchema);

 