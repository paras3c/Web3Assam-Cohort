# Frontend - User Management UI

A modern React single-page application built with Vite, Tailwind CSS, and Flowbite. This frontend displays users from a local backend and allows you to submit new users through an elegant, responsive interface.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [File Descriptions](#file-descriptions)
- [Component Guide](#component-guide)
- [Styling](#styling)

## Features

✅ **Dynamic User Display** - Fetches users from local backend  
✅ **Create New Users** - Submit user data with form validation  
✅ **Real-time Updates** - New users appear instantly after submission  
✅ **Responsive Design** - Works on mobile, tablet, and desktop  
✅ **Error Handling** - User-friendly error messages  
✅ **Loading States** - Loading spinner during API calls  
✅ **Modern UI** - Built with Tailwind CSS and Flowbite components  

## Tech Stack

- **React 19** - UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **Flowbite** - Pre-built UI components
- **Axios** - HTTP client for API calls
- **ESLint** - Code quality and linting

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── UserCard.jsx          # Individual user card component
│   │   └── SubmitForm.jsx        # User submission form
│   ├── App.jsx                   # Main application component
│   ├── App.css                   # App-specific styles
│   ├── main.jsx                  # Application entry point
│   ├── index.css                 # Global styles
│   └── assets/                   # Static assets (images, etc.)
├── public/                       # Public static files
├── index.html                    # HTML template
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── eslint.config.js              # ESLint configuration
├── package.json                  # Project dependencies
└── README.md                     # Documentation
```

## Prerequisites

- **Node.js** >= 16.x
- **npm** >= 7.x (or yarn/pnpm)
- **Backend running** on `http://localhost:3000` (from the backend folder)

## Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Ensure the backend is running:**
   - In another terminal, navigate to the backend folder
   - Run `npm install` and `node server.js`
   - Backend should be running on `http://localhost:3000`

## Usage

**Start the development server:**
```bash
npm run dev
```

The application will open at `http://localhost:5173` (or the address shown in your terminal).

### Workflow

1. **View Users** - The app fetches all users from the backend and displays them in a grid
2. **Add New User** - Fill in the form with a name and email, then click "Submit"
3. **See Results** - New users appear instantly in the grid below the form

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the project for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

## File Descriptions

### `src/App.jsx`
Main application component that:
- Fetches users from `http://localhost:3000/users`
- Manages loading and error states
- Renders the user grid and submission form
- Updates user list when new users are submitted
- Includes responsive layout with Tailwind CSS

### `src/components/UserCard.jsx`
Displays individual user information:
- Shows user avatar or initials fallback
- Displays name, email, and country
- Responsive card design with hover effects
- Supports both backend user format (`id`, `name`, `email`) and randomuser.me format

**Props:**
- `user` (Object) - User data object

### `src/components/SubmitForm.jsx`
Form component for adding new users:
- Name and email input fields
- Real-time validation
- Loading state during submission
- Error and success messages
- Calls backend `POST /users` endpoint

**Props:**
- `onSuccess` (Function) - Callback when user is successfully created

### `src/main.jsx`
Application entry point:
- Mounts React app to the DOM
- Initializes the root component

### `src/index.css`
Global styles and Tailwind CSS directives

### `src/App.css`
Application-specific custom styles

## Component Guide

### App Component

```jsx
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

**Key Features:**
- Fetches users on mount using `useEffect`
- Displays loading spinner while fetching
- Shows error message if backend is unreachable
- Updates user list when form submission succeeds

### UserCard Component

Displays a card with:
- User avatar (or initials if no image)
- User name
- Email address
- Country/location
- Hover shadow effect

Supports two user data formats:
1. Backend format: `{ id, name, email }`
2. External API format: `{ name: { first, last }, picture, location }`

### SubmitForm Component

Features:
- Name and email inputs
- Client-side email validation
- Loading indicator during submission
- Success/error message display
- Auto-clear inputs on success

## Styling

### Tailwind CSS

The project uses **Tailwind CSS 4** for styling. Key utility classes used:

- `bg-slate-50` - Light background
- `rounded` - Border radius
- `shadow-sm`, `shadow-lg` - Shadows
- `grid gap-6` - Grid layout
- `flex`, `items-center`, `justify-center` - Flexbox utilities
- `animate-spin` - Loading animation
- `disabled:opacity-60` - Disabled states

### Responsive Breakpoints

- `sm:` - Small screens (640px)
- `md:` - Medium screens (768px)
- `lg:` - Large screens (1024px)

### Custom Configuration

- Configured in `tailwind.config.js`
- PostCSS configured in `postcss.config.js`
- Flowbite plugin integrated for component styles

## Notes

- The app expects the backend to be running on `http://localhost:3000`
- If the backend is not running, users will see an error message
- Email validation is case-insensitive
- User data is real-time synced with the backend
- The grid layout is responsive: 1 column on mobile, 2 on tablets, 3-4 on desktop
- Form validation prevents empty names and invalid emails before submission
