const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

const initApiRoutes = require('./routes/initApiRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
initApiRoutes(app);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        EC: 1,
        EM: 'Something went wrong!',
        DT: null
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
