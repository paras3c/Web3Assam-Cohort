// src/App.jsx
import React, { useEffect, useState, useCallback } from "react";
import "./styles.css";
import { getUser } from "./api";
import UserForm from "./components/UserForm";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  }

  // FIXED: useCallback so that useEffect gets stable dependency
  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUser();
      setUser(data);
      showToast("User data loaded");
    } catch (err) {
      console.error(err); // FIXED: err is now used
      setError("Failed to fetch user");
      showToast("Error fetching user");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]); // FIXED dependency

  return (
    <div className="app-wrapper">
      {toast && <div className="toast">{toast}</div>}

      <div className="container">
        <h1>User Editor — Full Stack Assignment</h1>

        {loading && <p className="loader">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {user && (
          <>
            <div className="card">
              <h2>Current User</h2>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>

            <UserForm user={user} setUser={setUser} showToast={showToast} />
          </>
        )}
      </div>
    </div>
  );
}
