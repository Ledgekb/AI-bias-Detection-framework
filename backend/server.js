const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { calculateWEAT } = require('./utils/weat');
const BiasResult = require('./models/BiasResult');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory fallback if MongoDB is not connected
let results = [];

// API Routes
app.post('/api/bias/weat', async (req, res) => {
  const { modelName, targetA, targetB, attrX, attrY } = req.body;
  
  const score = calculateWEAT(targetA, targetB, attrX, attrY);
  
  const result = {
    modelName,
    metricType: 'WEAT',
    score: score.toFixed(4),
    details: { targetA, targetB, attrX, attrY },
    createdAt: new Date(),
  };

  try {
    if (mongoose.connection.readyState === 1) {
      const savedResult = await BiasResult.create(result);
      return res.status(201).json(savedResult);
    }
  } catch (err) {
    console.error('Persistence error:', err);
  }

  // Fallback to in-memory
  results.push(result);
  res.status(200).json(result);
});

app.get('/api/bias/history', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const history = await BiasResult.find().sort({ createdAt: -1 });
      return res.status(200).json(history);
    }
  } catch (err) {
    console.error('History fetch error:', err);
  }

  res.status(200).json(results.sort((a, b) => b.createdAt - a.createdAt));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Bias Analytics Engine running on port ${PORT}`);
});
