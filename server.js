// server.js - Main server file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/formRoutes');
const responseRoutes = require('./routes/responseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://komathi:komathi@cluster0.hpha8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/forms', formRoutes);
app.use('/api/responses', responseRoutes);

// Serve static files from frontend
app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});