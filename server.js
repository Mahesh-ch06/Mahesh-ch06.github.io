// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/alumni', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Success Story Schema
const successStorySchema = new mongoose.Schema({
    title: String,
    description: String,
    date: { type: Date, default: Date.now }
});

const SuccessStory = mongoose.model('SuccessStory', successStorySchema);

// Routes
app.get('/api/stories', async (req, res) => {
    try {
        const stories = await SuccessStory.find();
        res.json(stories);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/api/stories', async (req, res) => {
    try {
        const newStory = new SuccessStory(req.body);
        await newStory.save();
        res.status(201).json(newStory);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
