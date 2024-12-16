const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/Nutrition', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Verify Nutrition_Plan collection exists or create it
        if (!conn.connection.collections['nutrition_plans']) {
            await conn.connection.createCollection('nutrition_plans');
            console.log('Nutrition_Plan collection created');
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
