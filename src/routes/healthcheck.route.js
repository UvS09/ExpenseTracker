/**
 * Health Check Route - Defines endpoints for system status verification
 * 
 * This route module establishes endpoints that allow:
 * 1. External services to verify if the application is running properly
 * 2. Monitoring tools to check system availability and response time
 * 3. Load balancers to determine if the service instance is healthy
 * 4. DevOps teams to confirm deployment success and ongoing operational status
 * 
 * NOTE: Health check endpoints should be lightweight and fast to respond,
 * avoiding database connections or complex processing that might fail
 * independently of the API's core availability.
 * 
 */

// Import controller function that handles health check operations
// WHY: Separates route definition from business logic implementation
// WHY: Follows MVC pattern for better code organization and maintainability
const healthCheckController = require('../controllers/healthcheck.controller');

// Create an Express Router instance for health check routes
// WHY: Enables modular route handling for better organization
// WHY: Allows mounting these routes at different base paths if needed
// WHY: Keeps health check routes separate from other application routes
const HealthCheckRoute = require('express').Router();

// Define health check route and its corresponding controller
// WHY: Provides a dedicated endpoint that can be called to verify system status
// WHY: Uses GET method as it's retrieving status information, not modifying data
// WHY: Delegates processing logic to the controller for separation of concerns
HealthCheckRoute.get('/healthCheck', healthCheckController);

// Export the configured HealthCheckRoute to be mounted in the main Express app
// WHY: Makes these routes available to the main application
// WHY: Enables importing and using these routes in the app's central router configuration
// WHY: Follows module pattern for better code organization and reusability
module.exports = { HealthCheckRoute };