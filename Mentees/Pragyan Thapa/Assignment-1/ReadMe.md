# Full-Stack Assignment

## 1. Assignment Attempted
**Full‑Stack Assignment**

## 2. How to Run the Project

### Backend
```bash
cd backend
npm install
npm start
npm run dev
```

The backend server runs on **port 5000** (http://localhost:5000)

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on **port 3000** (http://localhost:3000)

## 📁 Folder Structure
```
assignment_01/
├── backend/
│   ├── server.js
│   ├── data.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── UserForm.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── api.js
│   │   └── style.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 3. Technologies Used
- **React** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Node.js + Express** - Backend runtime and web framework
- **FS Module** - File system operations for reading/writing JSON data
- **CSS3** - Modern styling with gradients and animations

## 4. API Endpoints

### GET /api/user
Returns stored user data from `data.json`.

**Response:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Developer"
}
```

### PUT /api/user
Updates and overrides existing user data in `data.json`.

**Request Body:**
```json
{
  "name": "New Name",
  "email": "new@example.com",
  "role": "New Role"
}
```

**Response:**
```json
{
  "message": "User updated successfully",
  "data": {
    "name": "New Name",
    "email": "new@example.com",
    "role": "New Role"
  }
}
```

**Note:** The backend automatically creates `data.json` with default values on first run if it doesn't exist.
