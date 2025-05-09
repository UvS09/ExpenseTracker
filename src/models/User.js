const { default: mongoose, mongo } = require("mongoose");

/**
 * User Model - Defines the schema for user authentication data
 * 
 * This schema implements core user authentication with:
 * 1. A unique userId for identification
 * 2. A password field for storing hashed credentials
 * 3. A login state flag to track active sessions
 * 
 * NOTE: For production applications, consider additional user fields like:
 * - email (for communications and alternate login)
 * - createdAt/updatedAt timestamps
 * - roles/permissions for access control
 * - personalInfo (name, contact details, etc.)
 * 
 */

const userSchema = new mongoose.Schema(
    {
        userId : {
            type: String,
            required: true,
            unique: true,
            trim: true
            // WHY: Used as the primary identifier for users during login
            // WHY: Enforced as unique to prevent duplicate accounts
            // WHY: Trimmed to avoid whitespace-related login issues
        },
        password : {
            type : String,
            required : true,
            // WHY: Stores hashed password, never raw credentials
            // WHY: Required field as authentication depends on it
            // WHY: No maximum length constraint to accommodate various hash algorithms
        },
        isLoggedIn : {
            type : Boolean,
            required : true,
            default : false
            // WHY: Tracks user's current login state
            // WHY: Default is false (logged out) for security reasons
            // WHY: Enables single-session enforcement in the authentication flow
        }
    }
)

// Creates the model from schema and exports it
// WHY: Mongoose models provide the interface for database operations
// WHY: Exported as a named export for explicit imports in controllers
const User = mongoose.model("User", userSchema)
module.exports = { User };