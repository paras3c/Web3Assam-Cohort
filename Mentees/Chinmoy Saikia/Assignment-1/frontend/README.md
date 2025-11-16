1. Assignment Attempted
Full‑Stack Assignment

2. How to Run the Project
Backend
cd backend
npm install
npm start

This starts the backend on:

http://localhost:5000

Frontend
cd frontend
npm install
npm run dev

Frontend will run on:

http://localhost:5173
(or the port Vite assigns)

3. Technologies Used
Frontend

React.js

Axios

TailwindCSS / CSS

Vite (if used)

Backend

Node.js

Express.js (optional but allowed)

JSON Server (for database simulation)

FS (File System) Module – used for reading/writing data if needed

4. API Endpoints
Base URL: http://localhost:5000/users
Method	        Endpoint	    Description
GET	             /users	        Fetch all users
POST	         /users	        Create new user
PUT         	/users/:id	    Update user
DELETE	        /users/:id	    Delete user

