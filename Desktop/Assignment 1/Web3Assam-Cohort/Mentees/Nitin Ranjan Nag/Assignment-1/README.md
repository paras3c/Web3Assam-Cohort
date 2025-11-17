# Full-Stack Assignment

## Assignment Attempted

**Full-Stack Assignment**

---

## 📋 Project Overview

This is a full-stack application that demonstrates CRUD operations using Node.js + Express backend and React frontend. The backend manages user data stored in a JSON file, and the frontend provides a clean UI to view and update user information.

---

## 🚀 How to Run the Project

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

4. The backend server will run on **http://localhost:5000**

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be available at **http://localhost:5173** (or the port shown in terminal)

### Running Both Services

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

---

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **FS Module** - File system operations for JSON file management
- **CORS** - Cross-Origin Resource Sharing middleware
- **Morgan** - HTTP request logger middleware

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Next-generation frontend build tool
- **Fetch API** - For making HTTP requests to the backend

---

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. GET /api/user
Retrieves the current user data from `data.json`.

**Response:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Developer"
}
```

**Status Codes:**
- `200 OK` - Successfully retrieved user data
- `500 Internal Server Error` - Server error

---

#### 2. PUT /api/user
Updates user data in `data.json`.

**Request Body:**
```json
{
  "name": "New Name",
  "email": "new@example.com",
  "role": "New Role"
}
```

**Validation:**
- All fields (name, email, role) are required
- Email must be a valid email format

**Response:**
```json
{
  "name": "New Name",
  "email": "new@example.com",
  "role": "New Role"
}
```

**Status Codes:**
- `200 OK` - Successfully updated user data
- `400 Bad Request` - Validation error or missing fields
- `500 Internal Server Error` - Server error

---

#### 3. GET /health
Health check endpoint to verify server is running.

**Response:**
```json
{
  "status": "ok"
}
```

---

## 📁 Project Structure

```
Assignment-1/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── userController.js    # User controller logic
│   │   ├── routes/
│   │   │   └── userRoutes.js         # API route definitions
│   │   ├── services/
│   │   │   └── userService.js        # Business logic layer
│   │   ├── utils/
│   │   │   └── fileStore.js          # File operations for data.json
│   │   ├── middleware/
│   │   │   └── errorHandler.js       # Error handling middleware
│   │   ├── app.js                     # Express app configuration
│   │   └── server.js                  # Server entry point
│   ├── data/
│   │   └── data.json                  # User data storage (auto-created)
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js                 # API service functions
│   │   ├── App.jsx                    # Main React component
│   │   ├── App.css                    # Component styles
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Global styles
│   ├── package.json
│   └── vite.config.js
│
└── README.md                          # This file
```

---

## ✨ Features

### Backend Features
- ✅ Auto-creates `data.json` file if it doesn't exist
- ✅ Modular code structure with separation of concerns
- ✅ Input validation for user data
- ✅ Error handling middleware
- ✅ CORS enabled for frontend communication
- ✅ Request logging with Morgan
- ✅ Health check endpoint

### Frontend Features
- ✅ Clean and modern UI design
- ✅ Fetches and displays user data from backend
- ✅ Form to update user information (name, email, role)
- ✅ Real-time form validation
- ✅ Loading states during API calls
- ✅ Success and error message notifications
- ✅ Responsive design for mobile and desktop
- ✅ Refresh button to reload user data

---

## 🎨 UI/UX Highlights

- **Gradient background** for visual appeal
- **Card-based layout** for organized content
- **Smooth animations** and transitions
- **Color-coded alerts** for success and error messages
- **Loading spinner** during data fetch
- **Disabled states** during form submission
- **Responsive grid layout** that adapts to screen size

---

## 🔧 Development Notes

### Backend
- The `data.json` file is automatically created in the `backend/data/` directory
- Default user data is initialized if the file doesn't exist
- File operations use synchronous methods for simplicity (can be upgraded to async if needed)
- Error handling includes fallback to default data if JSON parsing fails

### Frontend
- API base URL is configured in `src/services/api.js`
- Form validation includes email format checking
- Success messages auto-dismiss after 3 seconds
- Error messages can be manually dismissed

---

## 📝 Notes

- Ensure the backend is running before starting the frontend
- The backend server runs on port **5000** by default
- The frontend runs on port **5173** by default (Vite)
- CORS is enabled to allow frontend-backend communication
- All user data is persisted in `backend/data/data.json`

---

## 👤 Author

**Nitin Ranjan Nag**

---

## 📄 License

MIT

