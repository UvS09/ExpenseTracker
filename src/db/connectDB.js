const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

/**
 * Database Connection Module - Establishes and manages MongoDB connection
 * 
 * This module handles the MongoDB connection process by:
 * 1. Loading environment variables using dotenv
 * 2. Attempting to establish a connection to MongoDB using the URI from environment variables
 * 3. Implementing error handling for connection failures
 * 4. Providing clean process termination when database connection fails
 * 
 * NOTE: In production environments, additional connection options should be considered
 * such as connection pooling, retry mechanisms, and appropriate timeout settings to ensure
 * robust database connectivity and optimal performance under various network conditions.
 * 
 */
const connectDB = async () => {
    try{
        // Establish MongoDB connection using environment variables
        // WHY: Using environment variables keeps sensitive connection strings out of code
        // WHY: Async/await pattern handles the promise returned by mongoose.connect
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        // console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        // Error handling for database connection failures
        // WHY: Provides clear error messaging in console for debugging
        // WHY: Terminates the process since database connectivity is critical
        // WHY: Exit code 1 indicates abnormal termination due to error
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;