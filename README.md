# Backend Module

## Overview

This backend module provides authentication services including user registration, login, and logout functionality. It's built using Node.js, Express, and MongoDB, following MVC architecture principles.

## What is a Backend?

A backend (or "server-side") application handles tasks like:
- Storing and retrieving data from databases
- User authentication and authorization
- Business logic processing
- API endpoints that client applications can communicate with

This project uses:
- **Node.js**: A JavaScript runtime that lets you run JavaScript on a server
- **Express**: A web framework for Node.js that makes it easy to create web servers and APIs
- **MongoDB**: A NoSQL database that stores data in flexible JSON-like documents
- **MVC Architecture**: Model-View-Controller pattern that separates application logic:
  - **Models**: Define data structure (User.js)
  - **Views**: Handle presentation (not applicable in pure API backends)
  - **Controllers**: Process requests and send responses (login.controller.js, etc.)

## Features

- User registration with unique user IDs
- Secure login and authentication
- Logout functionality
- Health check endpoint for monitoring
- Password hashing for security

## Getting Started with Node.js

If you're new to Node.js development, follow these steps:

1. **Install Node.js**: Download and install from [nodejs.org](https://nodejs.org/)
2. **Verify installation**:
   ```bash
   node -v   # Shows Node.js version
   npm -v    # Shows npm (Node Package Manager) version
   ```
3. **Understanding package.json**: This file lists project dependencies and scripts
4. **Node modules**: Libraries installed via npm are stored in the "node_modules" folder

## Installation

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB instance

### Setup Steps

1. Clone the repository
```bash
git clone https://github.com/arjav1528/Module-4.git
cd Backend\ Module
```

2. Install dependencies
```bash
npm install
```

3. Environment Configuration
Create a `.env` file in the root directory with the following variables:
```
PORT=3000                                     # The port your server will run on
MONGODB_URI=<your connection_string>  # Connection to MongoDB
```

4. Start the development server
```bash
npm run dev
```

## API Documentation

An API (Application Programming Interface) is how different software systems communicate. This backend provides several API endpoints that accept HTTP requests and return JSON responses.

### Authentication Endpoints

#### Register a New User
```
POST /api/user/register
```

**What this does**: Creates a new user account in the database.

**Request Body:**
```json
{
  "userId": "username",        // The unique identifier for the user
  "password": "user_password"  // The user's password (will be securely hashed)
}
```

**Response:**
```json
{
  "status": 201,               // 201 means "Created" - success!
  "message": "User registered successfully",
  "data": {
    "userId": "username",      // The registered username
    "isLoggedIn": false        // Initially not logged in
  },
  "error": null                // No error when successful
}
```

#### Login
```
POST /api/user/login
```

**What this does**: Authenticates a user and marks them as logged in.

**Request Body:**
```json
{
  "userId": "username",        // The user's identifier
  "password": "user_password"  // The user's password
}
```

**Response:**
```json
{
  "status": 200,               // 200 means "OK" - success!
  "message": "Login successful",
  "data": {
    "userId": "username",
    "isLoggedIn": true         // Now marked as logged in
  },
  "error": null
}
```

#### Logout
```
POST /api/user/logout
```

**What this does**: Marks a user as logged out in the system.

**Request Body:**
```json
{
  "userId": "username"         // Only need the userId to logout
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Logout successful",
  "data": {
    "userId": "username",
    "isLoggedIn": false        // Now marked as logged out
  },
  "error": null
}
```

### System Endpoints

#### Health Check
```
GET /api/healthCheck
```

**What this does**: Checks if the server is running properly. Used for monitoring.

**Response:**
```json
{
  "status": 200,               // 200 means "OK"
  "message": "Server is running",
  "data": [],
  "error": null
}
```

## Project Structure Explained

```
/
├── index.js                 # Application entry point - starts the server
├── src/                     # Source code directory
│   ├── app.js               # Express application setup - configures the web server
│   ├── routes/              # API route definitions - maps URLs to controllers
│   │   ├── auth.route.js    # Authentication routes (login, register, logout)
│   │   └── healthcheck.route.js # Health check routes for monitoring
│   ├── controllers/         # Request handlers - business logic for each route
│   │   ├── login.controller.js     # Handles user login
│   │   ├── logout.controller.js    # Handles user logout
│   │   ├── register.controller.js  # Handles user registration
│   │   └── healthcheck.controller.js # Handles health checks
│   ├── models/              # Database schemas - defines data structure
│   │   └── User.js          # User model - defines user properties
│   └── db/
│       └── connectDB.js     # Database connection - connects to MongoDB
└── .env                     # Environment variables (not in repository)
```

### Key Files Explained

- **index.js**: The starting point of the application. It loads environment variables, connects to the database, and starts the server.

- **app.js**: Creates and configures the Express application, setting up middleware for parsing requests.

- **routes/auth.route.js**: Defines the URLs for authentication operations and connects them to controller functions.

- **controllers/login.controller.js**: Contains the logic for authenticating users, comparing passwords, and updating login state.

- **models/User.js**: Defines the structure of user data in the database using Mongoose schema.

## Understanding HTTP Methods

This API uses these HTTP methods:
- **GET**: Retrieve data (like health check)
- **POST**: Create or update data (like register, login, logout)

HTTP status codes in responses:
- **200**: Success (OK)
- **201**: Created successfully
- **400**: Bad request (client error)
- **404**: Not found
- **500**: Server error

## Security Considerations

- **Password Hashing**: Passwords are never stored as plain text. We use bcrypt which:
  - Adds random "salt" to make each hash unique
  - Uses one-way encryption that can't be reversed

- **Input Validation**: All user inputs are checked to:
  - Prevent malicious data
  - Ensure required fields are provided
  - Reject invalid formats

- **Session Management**: The system prevents users from logging in from multiple places at once.

- **Environment Variables**: Sensitive information like database credentials are kept in .env files that aren't committed to repositories.

## Common Issues and Troubleshooting

### Connection Errors
If you see "Error connecting to MongoDB", check:
- Is MongoDB running?
- Is your MONGODB_URI correct in the .env file?
- Do you have network access to the database?

### "Module not found" Errors
Run `npm install` to make sure all dependencies are installed.

### Server Won't Start
- Check if another application is using the same port
- Verify that your .env file exists with the correct variables

## Development

To run in development mode with nodemon (automatically restarts when code changes):

```bash
npm run dev
```



## Core Assignment: Simple Expense Tracker

### Assignment Overview

For this assignment, you will extend this authentication backend to create a basic expense tracker application. This will help you learn how to build upon an existing codebase by adding new models, controllers, and routes.

### Project Requirements

Building on the existing authentication system, implement the following features:

1. **Expense Management**
   - Create new expenses with amount, description, category, and date
   - View all expenses for the logged-in user
   - Update existing expenses

### Files You Need to Create

#### 1. Create the Expense Model
**File path:** `src/models/Expense.js`

Create an Expense model that includes:
- userId (to connect expenses to a specific user)
- amount (the cost of the expense)
- description (what the expense was for)
- category (like "Food", "Transportation", etc.)
- date (when the expense occurred)

#### 2. Create the Expense Controller
**File path:** `src/controllers/expense.controller.js`

Create an expense controller with these functions:
- `createExpense`: Add a new expense to the database
- `getExpenses`: Retrieve all expenses for a specific user
- `updateExpense`: Update an existing expense by its ID

#### 3. Create the Expense Routes
**File path:** `src/routes/expense.route.js`

Create routes that define these API endpoints:
- `POST /api/expense/create`: Create a new expense
- `GET /api/expense/all`: Fetch all expenses for a user
- `PUT /api/expense/update`: Update an expense by ID

#### 4. Update the Main Entry File
**File to modify:** `index.js`

Add your new expense routes to the main application by importing your expense router and adding the appropriate `app.use()` statement.

### Final Project Structure

When you're done, your project structure should look like this:


```
/
├── index.js                 # Application entry point - starts the server
├── src/                     # Source code directory
│   ├── app.js               # Express application setup - configures the web server
│   ├── routes/              # API route definitions - maps URLs to controllers
│   │   ├── auth.route.js    # Authentication routes (login, register, logout)
│   │   └── healthcheck.route.js # Health check routes for monitoring
│   │   ├── expense.route.js  # Expense management routes (create, get, update)
│   ├── controllers/         # Request handlers - business logic for each route
│   │   ├── login.controller.js     # Handles user login
│   │   ├── logout.controller.js    # Handles user logout
│   │   ├── register.controller.js  # Handles user registration
│   │   └── healthcheck.controller.js # Handles health checks
│   │   ├── expense.controller.js    # Handles expense management
│   ├── models/              # Database schemas - defines data structure
│   │   └── User.js          # User model - defines user properties
│   │   └── Expense.js       # Expense model - defines expense properties
│   └── db/
│       └── connectDB.js     # Database connection - connects to MongoDB
└── .env                     # Environment variables (not in repository)
```


## Alternative Assignment: Simple Learning Management System (LMS)

### Assignment Overview

Instead of the expense tracker, you can choose to build a simple Learning Management System (LMS) where teachers can assign grades to students, and students can view their grades.

### Project Requirements

Building on the existing authentication system, implement the following features:

1. **Enhanced User Model with Roles**
   - Add a "role" field to the existing User model (values: "teacher" or "student")
   - For teachers: Add a "coursesTaught" array with course IDs
   - For students: Add an "enrolledCourses" array with objects containing courseId and grade

2. **Course Management**
   - Create a simple Course model
   - Students can view their grades for enrolled courses
   - Teachers can assign grades to students in their courses

### Files You Need to Create

#### 1. Update the User Model
**File to modify:** `src/models/User.js`

Add to the existing User model:
- role (string: "teacher" or "student")
- coursesTaught (array of course IDs, for teachers only)
- enrolledCourses (array of objects with courseId and grade, for students only)

#### 2. Create the Course Model
**File path:** `src/models/Course.js`

Create a Course model that includes:
- courseName (name of the course)
- courseCode (unique identifier for the course)
- teacherId (reference to the teacher user)
- description (brief description of the course)

#### 3. Create LMS Controller
**File path:** `src/controllers/lms.controller.js`

Create an LMS controller with these functions:
- 'getStudents': Get all students enrolled in a course
- 'updateStudentGrade': Assign a grade to a student in a course
- 'getCourses' : Get all courses for students

#### 4. Create LMS Routes
**File path:** `src/routes/lms.route.js`

Create routes that define these API endpoints:
- `GET /api/lms/courses`: Get all courses for a student
- `POST /api/lms/assignGrade`: Assign a grade to a student in a course
- `GET /api/lms/students`: Get all students enrolled in a course

#### 5. Update the Main Entry File
**File to modify:** `index.js`

Add your new LMS routes to the main application.

### Final Project Structure

When you're done, your project structure should look like this:

```
/
├── index.js                 # Application entry point - starts the server
├── src/                     # Source code directory
│   ├── app.js               # Express application setup - configures the web server
│   ├── routes/              # API route definitions - maps URLs to controllers
│   │   ├── auth.route.js    # Authentication routes (login, register, logout)
│   │   └── healthcheck.route.js # Health check routes for monitoring
│   │   ├── lms.route.js      # LMS routes (courses, grades)
│   ├── controllers/         # Request handlers - business logic for each route
│   │   ├── login.controller.js     # Handles user login
│   │   ├── logout.controller.js    # Handles user logout
│   │   ├── register.controller.js  # Handles user registration
│   │   └── healthcheck.controller.js # Handles health checks
│   │   ├── lms.controller.js        # Handles LMS functionality (courses, grades)
│   ├── models/              # Database schemas - defines data structure
│   │   ├── User.js          # User model - defines user properties
│   │   └── Course.js        # Course model - defines course properties
│   └── db/
│       └── connectDB.js     # Database connection - connects to MongoDB
└── .env                     # Environment variables (not in repository)
```