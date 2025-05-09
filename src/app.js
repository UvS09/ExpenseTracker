/**
 * Express Application Configuration Module
 * 
 * This module initializes and configures the Express application by:
 * 1. Importing necessary dependencies
 * 2. Creating the core Express application instance
 * 3. Exporting the configured app for use in other modules
 * 
 * NOTE: This follows the modular design pattern where the app configuration is 
 * separated from server initialization, promoting better code organization,
 * testability, and flexibility across different environments.
 * 
 */

// Import required packages
// WHY: Express provides the foundation for building web applications and APIs
// WHY: It simplifies routing, middleware implementation, and HTTP interactions
const express = require('express');  // Import Express - a web framework for Node.js

// Create Express application instance
// WHY: Creates the central app object that will be configured with middleware and routes
// WHY: Serves as the foundation for all HTTP request handling in the application
// WHY: Follows the factory pattern where express() creates a fully configurable application object
const app = express();

// Additional configuration would typically be added here:
// - Body parsers for handling request data
// - CORS configuration for cross-origin requests
// - Authentication middleware
// - Route registration
// - Error handlers
// - Other application-wide middleware

// Export the configured Express application
// WHY: Enables modular architecture by separating app creation from server startup
// WHY: Facilitates testing by allowing routes to be tested without starting a server
// WHY: Supports different entry points for various environments (dev, test, prod)
// WHY: Follows the dependency injection pattern for better testability
module.exports = app;