const { User } = require("../models/User");
const bcrypt = require("bcrypt");

/**
 * Login Controller - Authenticates users and manages login state
 * 
 * This controller handles user authentication by:
 * 1. Validating user credentials (userId and password)
 * 2. Checking if the user exists in the database
 * 3. Verifying if the user is already logged in on another device
 * 4. Comparing passwords using secure bcrypt hashing
 * 5. Managing the login state (isLoggedIn flag)
 * 6. Returning appropriate responses based on authentication results
 * 
 * NOTE: In production-level applications, JWT (JSON Web Tokens) is typically used for session management
 * instead of the isLoggedIn flag approach. JWT provides stateless authentication, allowing secure 
 * transmission of user identity between client and server, and supports features like token expiration
 * and role-based access control.
 * 
 */
const loginController = async (req, res) => {
    
    const userId = req.body.userId;
    const password = req.body.password;

    // Input validation - ensures both userId and password are provided
    // WHY: Prevents unnecessary database queries with incomplete data
    // WHY: Provides clear feedback to client about missing information
    if(!userId || !password){
        return res.status(400).json({
            status: 400,
            message: "Please fill out all the fields",
            data: [],
            error: "Missing fields"
        });
    }

    try {
        // Find user in database by userId
        // WHY: Need to verify user exists before attempting authentication
        // WHY: Retrieves stored user details including hashed password for comparison
        const existingUser = await User.findOne({
            userId: userId
        });
    
        // User existence check
        // WHY: Prevents revealing if a specific userId exists in the database
        // WHY: Provides generic "not found" error rather than authentication failure
        if(!existingUser){
            return res.status(404).json({
                status: 404,
                message: "User not found",
                data: [],
                error: "User does not exist"
            });
        }
    
        // Check if user is already logged in elsewhere
        // WHY: Prevents concurrent logins from multiple devices (if that's a requirement)
        // WHY: Helps with session management and security by enforcing single-session policy
        if(existingUser.isLoggedIn === true){
            return res.status(400).json({
                status: 400,
                message: "ID already logged in from another device",
                data: [],
                error: "Already logged in"
            });
        }
        
        // Password verification using bcrypt's secure comparison
        // WHY: Uses bcrypt.compare() which is time-constant (prevents timing attacks)
        // WHY: Never compares passwords in plaintext - always uses hashed comparison
        // WHY: Passwords are stored as one-way hashes, not retrievable plaintext
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        
        // Invalid password handling
        // WHY: Returns 403 Forbidden for security reasons
        // WHY: Uses generic "Invalid credentials" to avoid revealing which credential was wrong
        if(!isPasswordValid){
            return res.status(403).json({
                status: 403,
                message: "Unauthorized",
                data: [],
                error: "Invalid credentials"
            });
        }
    
        // Update user's login status
        // WHY: Marks user as logged in to enforce single-session policy
        // WHY: Persists login state in database for session tracking
        existingUser.isLoggedIn = true;
        await existingUser.save();
    
        // Successful authentication response
        // WHY: Returns minimal user data to avoid exposing sensitive information
        // WHY: Confirms login status to client for UI state management
        return res.status(200).json({
            status: 200,
            message: "Login successful",
            data: {
                userId: existingUser.userId,
                isLoggedIn: existingUser.isLoggedIn
            },
            error: null
        });
    } catch (error) {
        // Error handling for unexpected exceptions
        // WHY: Logs full error details server-side for debugging
        // WHY: Returns generic error message to client to avoid exposing implementation details
        // WHY: Includes specific error message in controlled environment for easier debugging
        console.error("Error : ", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            data: [],
            error: error.message || "Something went wrong"
        });
    }
}

module.exports = { loginController };