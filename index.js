// Import required packages and modules
const app = require('./src/app');             // Import the Express app from app.js
const mongoose = require('mongoose');         // Import Mongoose - a library to work with MongoDB
const express = require('express');           // Import Express - a web framework for Node.js

/**
 * Environment Configuration Module - Securely loads and manages configuration settings
 * 
 * This section handles environment variables by:
 * 1. Loading the dotenv package to read variables from .env files
 * 2. Explaining the security importance of environment variable handling
 * 3. Setting up proper configuration isolation from application code
 * 
 * WHY HIDE ENVIRONMENT VARIABLES:
 * - Security: Prevents exposing sensitive credentials (DB passwords, API keys, JWT secrets)
 * - Environment flexibility: Allows different settings across dev/staging/production
 * - Separates configuration from code following best practices and protecting against data breaches
 * 
 * NOTE: ALWAYS include .env files in .gitignore to prevent committing sensitive information to version control
 */
const dotenv = require('dotenv');             // Import dotenv - to load environment variables from .env file
dotenv.config();                              // Load environment variables from .env file

/**
 * Application Dependencies and Configuration
 * 
 * This section:
 * 1. Imports essential modules for database connectivity
 * 2. Sets up route handlers for different API endpoints
 * 3. Configures application runtime parameters
 * 
 * WHY: Module separation provides better code organization, maintainability, and testing
 * WHY: Using environment variables for configuration allows deployment flexibility
 * WHY: Route modularization enables cleaner code structure and easier maintenance
 */
const connectDB = require('./src/db/connectDB'); // Import database connection function
const { HealthCheckRoute } = require('./src/routes/healthcheck.route'); // Import health check routes
const { AuthRouter } = require('./src/routes/auth.route'); // Import authentication routes
const PORT = process.env.PORT || 3000;        // Get the port from environment variables or use 3000 as default

/**
 * Express Middleware Configuration
 * 
 * This section configures the request processing pipeline by:
 * 1. Setting up body parsers for different content types
 * 2. Configuring static file serving for client-side assets
 * 3. Establishing the processing sequence for incoming requests
 * 
 * WHY: Middleware functions process requests before they reach route handlers
 * WHY: They provide critical functionality like parsing request bodies, handling sessions, and more
 * WHY: The middleware execution order matters - each processes the request sequentially
 * WHY: Proper middleware configuration ensures the application can correctly handle different request types
 */
app.use(express.json());                      // Enable parsing JSON bodies in requests
app.use(express.urlencoded({ extended: true })); // Enable parsing URL-encoded bodies (form data)
app.use(express.static('public'));            // Serve static files from the 'public' directory

/**
 * API Routes Configuration
 * 
 * This section:
 * 1. Maps URL paths to their respective route handlers
 * 2. Establishes the API's URL structure and hierarchy
 * 3. Directs requests to appropriate controller functions
 * 
 * WHY: Route modularization improves code organization and maintainability
 * WHY: Path prefixing (like '/api') creates logical API versioning and namespacing
 * WHY: Separating routes by resource type follows REST principles and API best practices
 */
app.use('/api', HealthCheckRoute);            // Any request to '/api' will be handled by HealthCheckRoute
app.use('/api/user', AuthRouter);             // Any request to '/api/user' will be handled by AuthRouter

/**
 * Server Initialization and Database Connection
 * 
 * This section:
 * 1. Establishes connection to the MongoDB database
 * 2. Starts the Express server only after successful database connection
 * 3. Implements error handling for database connection failures
 * 
 * WHY: We connect to DB first before starting the server because:
 * - Ensures data availability - app can access data as soon as it starts handling requests
 * - Prevents runtime errors from failed DB operations in request handlers
 * - Provides better error handling - can exit gracefully if DB connection fails
 * 
 * NOTE: The Promise-based approach allows for clean sequential execution and proper error handling
 */
connectDB()                                   // Call the function to connect to MongoDB
    .then(() => {                             // If connection is successful...
        app.listen(PORT, () => {              // Start the Express server on the specified port
            console.log(`Server is running on port ${PORT}`);   // Log a success message to console
            console.log(`http://localhost:${PORT}`);            // Log the local URL to access the server
        });
    })
    .catch((error) => {                       // If connection fails...
        console.error('Error connecting to the database:', error); // Log the error to console
    });
