/**
 * Authentication Router
 * 
 * Manages authentication endpoints including login, registration, and logout.
 * Follows RESTful conventions with appropriate HTTP methods.
 * 
 * Security considerations:
 * - Production implementations should include rate limiting
 * - Input validation should be applied
 * - CSRF protection is recommended
 */

// Import authentication controllers
const { loginController } = require('../controllers/login.controller');
const { registerController } = require('../controllers/register.controller');

// Initialize router for authentication endpoints
const AuthRouter = require('express').Router();

// Authentication routes
// POST methods are used as these operations modify server state

// Login - Authenticates users and establishes sessions
AuthRouter.post('/login', loginController);

// Registration - Creates new user accounts
AuthRouter.post('/register', registerController);


// Export router for use in main application
module.exports = { AuthRouter };