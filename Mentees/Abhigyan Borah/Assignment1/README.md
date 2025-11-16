# Assignment 1 - Full Stack 


## 📋 Project Overview

This assignment showcases a working full-stack application with:
- **Backend API** - RESTful API built with Express.js for managing user data
- **Frontend UI** - React single-page application with a responsive interface
- **Data Storage** - JSON-based persistent storage
- **Input Validation** - Client and server-side validation
- **Error Handling** - Comprehensive error handling throughout the stack

## 📁 Folder Structure

```
Assignment1/
├── backend/                           # Express.js backend server
│   ├── App/
│   │   ├── controllers/
│   │   │   └── userController.js     # User business logic
│   │   ├── middleware/
│   │   │   ├── errorHandler.js       # Global error handling
│   │   │   └── validateUser.js       # Input validation
│   │   ├── models/
│   │   │   └── userModel.js          # Data persistence
│   │   └── routes/
│   │       └── userRoutes.js         # API routes
│   ├── server.js                      # Express server setup
│   ├── users.json                     # User data storage
│   ├── package.json                   # Backend dependencies
│   └── README.md                      # Backend documentation
│
└── frontend/                          # React frontend application
    ├── src/
    │   ├── components/
    │   │   ├── UserCard.jsx          # User display component
    │   │   └── SubmitForm.jsx        # User submission form
    │   ├── App.jsx                    # Main app component
    │   ├── main.jsx                   # Entry point
    │   ├── App.css                    # App styles
    │   ├── index.css                  # Global styles
    │   └── assets/                    # Static assets
    ├── public/                        # Public files
    ├── index.html                     # HTML template
    ├── package.json                   # Frontend dependencies
    ├── vite.config.js                 # Vite configuration
    ├── tailwind.config.js             # Tailwind CSS config
    ├── eslint.config.js               # ESLint config
    └── README.md                      # Frontend documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

### Setup Instructions

#### 1. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the server
node server.js
```

The backend will run on **http://localhost:3000**

#### 2. Frontend Setup (in a new terminal)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on **http://localhost:5173**

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 🎯 Features

### Backend Features
- ✅ Get all users (GET `/users`)
- ✅ Create new user (POST `/users`)
- ✅ Email uniqueness validation
- ✅ Input format validation
- ✅ Error handling with appropriate HTTP status codes
- ✅ CORS enabled for frontend communication
- ✅ JSON file-based data persistence

### Frontend Features
- ✅ Display users in a responsive grid
- ✅ Real-time user submission form
- ✅ Client-side input validation
- ✅ Loading states and error messages
- ✅ Auto-increment user list on submission
- ✅ Modern responsive UI with Tailwind CSS
- ✅ Smooth animations and transitions

## 📚 API Documentation

### Get All Users

**Request:**
```http
GET /users
```

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

### Create User

**Request:**
```http
POST /users
Content-Type: application/json

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

**Error Response (400 Bad Request):**
```json
{
  "error": "Name is required and must be a non-empty string."
}
```

**Error Response (409 Conflict):**
```json
{
  "error": "Email already exists"
}
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **File System (fs)** - Data persistence

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS
- **Flowbite** - UI component library
- **Axios** - HTTP client
- **ESLint** - Code linting

## 📝 File Descriptions

### Backend Files

| File | Purpose |
|------|---------|
| `server.js` | Express app setup, middleware configuration, route mounting |
| `App/controllers/userController.js` | Business logic for user operations |
| `App/models/userModel.js` | Data read/write operations |
| `App/routes/userRoutes.js` | API route definitions |
| `App/middleware/validateUser.js` | Input validation middleware |
| `App/middleware/errorHandler.js` | Error handling middleware |
| `users.json` | JSON file storing user data |

### Frontend Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main application component |
| `src/components/UserCard.jsx` | User profile display component |
| `src/components/SubmitForm.jsx` | User creation form component |
| `src/main.jsx` | React app entry point |
| `src/App.css` | Application styles |
| `src/index.css` | Global styles |
| `vite.config.js` | Vite build configuration |
| `tailwind.config.js` | Tailwind CSS configuration |

## 🔄 Application Workflow

```
User Opens Browser
    ↓
Frontend loads (React App)
    ↓
App fetches users from Backend (GET /users)
    ↓
Users displayed in grid
    ↓
User fills form and submits
    ↓
Frontend validates input
    ↓
POST request sent to Backend (/users)
    ↓
Backend validates input
    ↓
Backend checks for duplicate email
    ↓
Backend saves to users.json
    ↓
Response returned to Frontend
    ↓
Frontend updates user list
    ↓
Form cleared, success message shown
```

## ✅ Validation Rules

### Name Validation
- Required field
- Must be a non-empty string
- Whitespace trimmed

### Email Validation
- Required field
- Must match email format: `user@domain.com`
- Case-insensitive
- Must be unique (no duplicates)
- Whitespace trimmed and lowercased

## 🚨 Error Handling

### Backend Error Responses

| Status | Message | Cause |
|--------|---------|-------|
| 400 | "Name is required..." | Missing or invalid name |
| 400 | "A valid email is required." | Missing or invalid email |
| 409 | "Email already exists" | Duplicate email |
| 500 | Server error | Unexpected error |

### Frontend Error Display
- Network errors show user-friendly message
- Backend validation errors displayed in form
- Loading state prevents double submission
- Auto-clear form on successful submission

## 💡 Key Features Explained

### Auto-incrementing IDs
User IDs are automatically generated based on the highest existing ID + 1

### Case-insensitive Email
Emails are stored in lowercase to prevent duplicates with different casing

### CORS Support
Enabled to allow frontend (port 5173) to communicate with backend (port 3000)

### Async/Await Pattern
All file operations use async/await for non-blocking I/O

### Responsive Grid
Frontend grid adapts: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)


