import { useEffect, useState } from "react";
import { fetchUser, updateUser } from "./api";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUser();
      setUser(data);
      setForm(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await updateUser(form);
      setUser(response.data);
      setSuccess(response.message || "User data updated successfully!");
      
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="loading">Loading user data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>User Management</h1>
        <p className="subtitle">Full-Stack Assignment</p>

        <div className="user-display">
          <h2>Current User Information</h2>
          <div className="user-info">
            <div className="info-item">
              <span className="label">Name:</span>
              <span className="value">{user?.name || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{user?.email || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="label">Role:</span>
              <span className="value">{user?.role || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Update User Information</h2>
          
          {error && (
            <div className="alert alert-error">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {success && (
            <div className="alert alert-success">
              <strong>Success:</strong> {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                placeholder="Enter your role"
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
