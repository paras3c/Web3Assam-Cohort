# 🚀 Full-Stack Assignment

## 📌 Overview

This full‑stack assignment evaluates your ability to:

* Build a **Node.js + Express backend** that performs **JSON-based CRUD operations**.
* Create and maintain a **data.json** file on the backend.
* Expose APIs that allow reading and updating user details.
* Build a **React (or Next.js) frontend** to fetch and display the data.
* Update the user data from the frontend using the backend API.
* Submit your work via a Pull Request inside the required folder structure.

---

# 🗂️ Folder Structure Requirements

After forking the repository:

```
/mentee/
   /your-name/
       /Assignment-1/
          (Project Files)
           README.md
```

* All code **must** be inside the folder:
  **`/Mentees/your-name/Assignment-1/`**
* Use **any framework** you prefer: React, Next.js, Vite, Express, NestJS, etc.
* You **may use AI**, but only if you can debug and produce a working, error-free submission.

---

# 🎯 Project Requirements

## 🖥️ Backend (Node + Express)

Your backend must:

1. Auto-create a file named **data.json** if it does not exist.
2. Store user information in JSON format, example:

   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "role": "Developer"
   }
   ```
3. Expose the following APIs:

### **GET /api/user**

* Returns the JSON data.

### **PUT /api/user**

* Updates fields in `data.json`.
* Accepts body parameters like:

  ```json
  {
    "name": "New Name",
    "email": "new@example.com"
  }
  ```
* Should validate fields before saving.

### **Additional Requirements**

* Use `fs` module for file operations.
* Clean code with modular structure.
* The server must run on port **5000** (or show port in README).

---

# 🎨 Frontend (React / Next.js Allowed)

Your frontend must:

1. Fetch user data from the backend using **GET /api/user**.
2. Display the user data in a clean UI.
3. Provide a form with fields:

   * Name
   * Email
   * Role
4. On form submit:

   * Send **PUT /api/user** request
   * Update the backend JSON file
   * Re-render the updated data on the frontend

### **UI Expectations**

* Clean layout
* Proper loading and error states
* A success message after update

---

# 🧪 Evaluation Criteria

Your submission will be evaluated on:

* Correct folder structure
* Clean and working backend APIs
* JSON file creation logic
* Functional frontend integration
* Ability to debug + error-free build
* Code readability & documentation

---

# 📄 README Requirements

Inside **Assignment-1/README.md**, include:

## **1. Assignment Attempted**

```
Full‑Stack Assignment
```

## **2. How to Run the Project**

### Backend

```
cd backend
npm install
npm start
```

### Frontend

```
cd frontend
npm install
npm run dev
```

## **3. Technologies Used**

* React or Next.js
* Node.js + Express
* FS Module

## **4. API Endpoints**

List all implemented routes.

---

# 📝 Submission Guidelines

Follow these steps strictly:

1. **Fork** the repository:
   👉 `https://github.com/jishantukripal/Web3Assam-Cohort/`

2. Navigate to:
   `/mentee/your-name/`

3. Create folder:
   `Assignment-1`

4. Add:

   * `Project Files`
   * `README.md`

5. Push your complete code.

6. Create a **Pull Request** to the Cohort Repo.

7. PR Title Format:

   ```
   Full-Stack Assignment – your-name
   ```

8. Ensure your project is **error-free and runs successfully** before submitting.

---

# ✅ All the Best !!
