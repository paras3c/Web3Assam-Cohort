# User Management REST API

A simple REST API built with Go and Gin framework for managing users. This server provides endpoints to create and retrieve users, storing data persistently in a JSON file.

## Features

- Create new users with name and email validation
- Retrieve all users
- Auto-increment user IDs
- Duplicate email detection (case-insensitive)
- Thread-safe file operations with mutex
- JSON file-based storage

## Prerequisites

- Go 1.24.4 or higher
- Internet connection (for initial dependency download)

## Installation

1. Navigate to the project directory:
   ```bash
   cd "Mentees/Adrish Bora/assignment1"
   ```

2. Install dependencies:
   ```bash
   go mod download
   ```

## How to Run Your Server

There are two ways to run the server:

### Option 1: Run directly
```bash
go run main.go
```

### Option 2: Build and run
```bash
# Build the executable
go build -o user-api main.go

# Run the executable
./user-api
```

The server will start on **port 8080** and you should see the message:
```
Server starting on :8080...
```

## API Endpoints

### 1. Get All Users

Retrieves a list of all users stored in the system.

- **URL:** `/users`
- **Method:** `GET`
- **Success Response:**
  - **Code:** 200 OK
  - **Content:**
    ```json
    [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com"
      }
    ]
    ```
- **Error Response:**
  - **Code:** 500 Internal Server Error
  - **Content:**
    ```json
    {
      "error": "Could not read user data"
    }
    ```

**Example Request:**
```bash
curl -X GET http://localhost:8080/users
```

---

### 2. Create User

Creates a new user with the provided name and email.

- **URL:** `/users`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- **Success Response:**
  - **Code:** 201 Created
  - **Content:**
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
    ```
- **Error Responses:**
  - **Code:** 400 Bad Request
    - **Content:**
      ```json
      {
        "error": "Key: 'CreateUserRequest.Name' Error:Field validation for 'Name' failed on the 'required' tag"
      }
      ```
    - **Reason:** Missing or invalid required fields
  
  - **Code:** 409 Conflict
    - **Content:**
      ```json
      {
        "error": "User with this email already exists"
      }
      ```
    - **Reason:** A user with the same email already exists (case-insensitive)
  
  - **Code:** 500 Internal Server Error
    - **Content:**
      ```json
      {
        "error": "Could not save user data"
      }
      ```
    - **Reason:** Server failed to save the user data

**Example Request:**
```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

## Data Storage

User data is stored in `users.json` file in the same directory as the application. The file is created automatically when the first user is added. The JSON file format:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

## Validation Rules

- **Name:** Required field
- **Email:** Required field with valid email format
- **Email Uniqueness:** Case-insensitive check for duplicate emails

## Technical Details

- **Framework:** Gin (github.com/gin-gonic/gin)
- **Port:** 8080
- **Concurrency:** Thread-safe file operations using mutex
- **ID Generation:** Auto-increment based on the last user ID

## Testing the API

You can test the API using curl, Postman, or any HTTP client:

### Get all users:
```bash
curl http://localhost:8080/users
```

### Create a user:
```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Johnson", "email": "alice@example.com"}'
```

### Create another user:
```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Bob Wilson", "email": "bob@example.com"}'
```

### Verify users were created:
```bash
curl http://localhost:8080/users
```

## Stopping the Server

Press `Ctrl + C` in the terminal where the server is running to stop it gracefully.
