# Backend - User Management API

A simple Express.js backend server that manages user data with CRUD operations. This API provides endpoints to retrieve and create users, with built-in validation and error handling.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [File Descriptions](#file-descriptions)
- [Middleware](#middleware)

## Features

✅ **User Management** - Create and retrieve users  
✅ **Data Persistence** - Users stored in `users.json`  
✅ **Input Validation** - Email format and name validation  
✅ **Error Handling** - Centralized error handling middleware  
✅ **CORS Support** - Cross-Origin Resource Sharing enabled  
✅ **Duplicate Prevention** - Prevents duplicate email addresses  

## Project Structure

```
backend/
├── App/
│   ├── controllers/
│   │   └── userController.js      # Business logic for user operations
│   ├── middleware/
│   │   ├── errorHandler.js        # Global error handling
│   │   └── validateUser.js        # Input validation
│   ├── models/
│   │   └── userModel.js           # Data persistence layer
│   └── routes/
│       └── userRoutes.js          # API route definitions
├── server.js                      # Express server setup
├── users.json                     # User data storage
├── package.json                   # Project dependencies
└── README.md                      # Documentation
```

## Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install:
   - `express` - Web framework
   - `cors` - Cross-Origin Resource Sharing support

## Usage

**Start the server:**
```bash
node server.js
```

The server will start on `http://localhost:3000` by default. You'll see:
```
Server running on port 3000
```

You can also specify a custom port:
```bash
PORT=5000 node server.js
```

## API Endpoints

### Get All Users

**GET** `/users`

Returns a list of all users from `users.json`.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@mail.com"
  },
  {
    "id": 2,
    "name": "Bob",
    "email": "bob@mail.com"
  }
]
```

### Create a New User

**POST** `/users`

Creates a new user with validation.

**Request Body:**
```json
{
  "name": "Charlie",
  "email": "charlie@mail.com"
}
```

**Response (201 Created):**
```json
{
  "message": "User added successfully",
  "user": {
    "id": 3,
    "name": "Charlie",
    "email": "charlie@mail.com"
  }
}
```

**Error Responses:**
- **400 Bad Request** - Missing or invalid name/email
  ```json
  { "error": "Name is required and must be a non-empty string." }
  ```

- **409 Conflict** - Email already exists
  ```json
  { "error": "Email already exists" }
  ```

## File Descriptions

### `server.js`
Main entry point that:
- Initializes Express application
- Configures middleware (JSON parsing, CORS, error handling)
- Mounts user routes at `/users`
- Starts the server on port 3000

### `App/controllers/userController.js`
Contains business logic:
- **`getUsers()`** - Fetches all users from `users.json`
- **`createUser()`** - Creates a new user with:
  - Duplicate email prevention
  - Auto-incremented ID generation
  - JSON file update

### `App/routes/userRoutes.js`
Defines API routes:
- `GET /` → `getUsers` controller
- `POST /` → `validateUser` middleware → `createUser` controller

### `App/middleware/validateUser.js`
Validates incoming requests:
- Checks if `name` is a non-empty string
- Validates `email` format using regex
- Trims and lowercases email for consistency
- Returns 400 status with error message if validation fails

### `App/middleware/errorHandler.js`
Global error handler:
- Catches all errors from routes and controllers
- Returns appropriate HTTP status codes
- Prevents server crashes

### `App/models/userModel.js`
Data persistence layer:
- **`readUsers()`** - Reads users from `users.json`
- **`writeUsers(users)`** - Writes users to `users.json`
- Handles file operations asynchronously

### `users.json`
JSON file storing user data. Format:
```json
[
  {
    "id": 1,
    "name": "User Name",
    "email": "user@email.com"
  }
]
```

## Middleware

### Error Handler (`errorHandler.js`)
Catches and handles all errors in the application pipeline.

### User Validation (`validateUser.js`)
Validates user input before creating new users:
- Name must be a non-empty string
- Email must be in valid email format (`user@domain.com`)

### CORS
Enabled globally to allow requests from different origins (needed for frontend communication).

## Notes

- User IDs are auto-generated based on the highest existing ID + 1
- Emails are case-insensitive and stored in lowercase
- All user data is persisted to `users.json`
- The API uses async/await for non-blocking operations
