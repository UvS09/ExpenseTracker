/**
 * Health Check Controller - Verifies server operational status
 * 
 * This controller provides a simple endpoint that:
 * 1. Responds with a HTTP 200 OK status to indicate service availability
 * 2. Returns a standardized response object with status information
 * 3. Serves as a monitoring target for infrastructure tools
 * 4. Enables systems to verify the API is functioning normally
 * 
 * NOTE: Health checks should remain lightweight and fast-responding to minimize
 * resource consumption, especially during high traffic periods or when monitoring
 * systems make frequent requests.
 * 
 */

// Health Check Controller
// This controller provides an API endpoint to verify that the server is operational
// WHY USE HEALTH CHECKS:
// - Monitoring: Allows uptime monitoring services to track API availability
// - Load Balancers: Helps load balancers determine if an instance is healthy
// - Deployment Verification: Quick way to confirm successful deployment
// - Service Discovery: Enables service discovery systems to find healthy instances
// NOTE: Health checks should be lightweight and fast-responding to avoid unnecessary resource usage

const healthCheckController = async (req, res) => {
    // Success response with operational status
    // WHY: Uses HTTP 200 to indicate normal operation for monitoring tools
    // WHY: Includes status code in response body for consistency with API standards
    // WHY: Provides an empty data array to maintain response structure uniformity
    return res.status(200).json({             // Respond with a HTTP 200 OK status
        status: 200,                           // Include numeric status code in the response body
        message: "Server is running",          // Human-readable message indicating successful operation
        data: [],                              // Empty array as health checks don't return business data
        error: null                            // No error for successful health check responses
    });
}

module.exports = healthCheckController;        // Export the controller for use in route definitions