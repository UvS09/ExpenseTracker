/**
 * Authentication Router - Manages all authentication-related routes
 * 
 * This module handles routing for authentication operations by:
 * 1. Centralizing all authentication endpoints in one location
 * 2. Mapping HTTP requests to their corresponding controller functions
 * 3. Providing clear endpoint structure for authentication flows
 * 4. Enforcing proper HTTP methods for each authentication operation
 * 
 * NOTE: The router uses a RESTful approach with POST methods for authentication
 * operations, which is appropriate for operations that modify server state.
 * In a production environment, additional middleware for rate limiting,
 * input validation, and CSRF protection would typically be applied to these routes.
 */

// Import controller functions that handle specific authentication operations
const { loginController } = require('../controllers/login.controller');       // Controller for user login
const { logoutController } = require('../controllers/logout.controller');     // Controller for user logout
const { registerController } = require('../controllers/register.controller'); // Controller for user registration

// Create an Express Router instance for authentication routes
// WHY: Modularizes route handling for better code organization
// WHY: Enables mounting all auth routes under a specific path prefix
// WHY: Separates authentication concerns from other application routes
const AuthRouter = require('express').Router();

// Define authentication routes and their corresponding controllers
// WHY: Maps each authentication endpoint to its specific business logic
// WHY: Uses POST method as these operations modify server state
// WHY: Each route has a dedicated controller for proper separation of concerns

// Login route - authenticates users and establishes sessions
// WHY: Processes credentials and returns authentication tokens/session info
AuthRouter.post('/login', loginController);

// Registration route - creates new user accounts
// WHY: Handles user information collection and account creation
// WHY: Performs validation before storing new user data
AuthRouter.post('/register', registerController);

// Logout route - terminates active user sessions
// WHY: Invalidates tokens/sessions for security
// WHY: Updates user login state in the database
AuthRouter.post('/logout', logoutController);

// Export the configured AuthRouter to be mounted in the main Express app
// WHY: Allows the main application to use these routes under a specific path
// WHY: Maintains modularity in the application structure
// WHY: Enables authentication routes to be easily imported elsewhere
module.exports = { AuthRouter };