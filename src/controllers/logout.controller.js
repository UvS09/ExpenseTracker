const { User } = require("../models/User");

/**
 * Logout Controller - Manages user logout process
 * 
 * This controller handles the user logout functionality by:
 * 1. Validating the provided userId
 * 2. Verifying if the user exists in the database
 * 3. Updating the user's login state (isLoggedIn flag)
 * 4. Returning appropriate responses based on logout results
 * 
 * NOTE: In production-level applications, this would typically involve
 * invalidating JWT tokens, clearing cookies, or implementing other session
 * termination mechanisms rather than just updating a database flag.
 * 
 */
const logoutController = async (req, res) => {
    const userId = req.body.userId;

    // Input validation - ensures userId is provided
    // WHY: Prevents unnecessary database operations with missing identifiers
    // WHY: Provides clear feedback about required information
    if (!userId) {
        return res.status(400).json({ error: "Please provide a userId" });
    }

    try {
        // Find user in database by userId
        // WHY: Need to verify user exists before attempting to log them out
        // WHY: Retrieves current user state to update login status
        const existingUser = await User.findOne({ userId });

        // User existence check
        // WHY: Prevents logout attempts for non-existent users
        // WHY: Returns specific error to indicate the user wasn't found
        if (!existingUser) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
                data: [],
                error: "User does not exist"
            });
        }

        // Update user's login status
        // WHY: Marks user as logged out in the database
        // WHY: Enables tracking of user session state
        existingUser.isLoggedIn = false;
        await existingUser.save();

        // Successful logout response
        // WHY: Returns minimal user data confirming logout status
        // WHY: Provides confirmation of successful state change
        return res.status(200).json({
            status: 200,
            message: "Logout successful",
            data: {
                userId: existingUser.userId,
                isLoggedIn: existingUser.isLoggedIn
            },
            error: null
        });
    } catch (error) {
        // Error handling for unexpected exceptions
        // WHY: Logs complete error details server-side for debugging
        // WHY: Returns controlled error message to client
        // WHY: Includes HTTP status code for proper error handling by clients
        console.error("Error during logout:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: [],
            error: error.message || "Something went wrong"
        });
    }
}

module.exports = { logoutController };