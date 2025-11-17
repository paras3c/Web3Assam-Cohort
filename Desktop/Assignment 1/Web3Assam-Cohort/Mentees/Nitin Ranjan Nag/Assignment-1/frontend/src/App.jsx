import { useState, useEffect } from 'react';
import { getUser, updateUser } from './services/api';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUser();
      setUser(data);
      setFormData({
        name: data.name || '',
        email: data.email || '',
        role: data.role || '',
      });
    } catch (err) {
      setError(err.message || 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear success message when user starts typing
    if (success) setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.role.trim()) {
      setError('All fields are required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);
      
      const updatedUser = await updateUser(formData);
      setUser(updatedUser);
      setSuccess('User data updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update user data');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="container">
        <header>
          <h1>User Management System</h1>
          <p className="subtitle">Full-Stack Assignment - Web3Assam Cohort</p>
        </header>

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            <span>{error}</span>
            <button className="alert-close" onClick={() => setError(null)}>
              ×
            </button>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span className="alert-icon">✓</span>
            <span>{success}</span>
          </div>
        )}

        <div className="content-grid">
          {/* Display User Data */}
          <section className="card">
            <h2>Current User Data</h2>
            {user ? (
              <div className="user-display">
                <div className="user-field">
                  <label>Name:</label>
                  <p>{user.name || 'N/A'}</p>
                </div>
                <div className="user-field">
                  <label>Email:</label>
                  <p>{user.email || 'N/A'}</p>
                </div>
                <div className="user-field">
                  <label>Role:</label>
                  <p>{user.role || 'N/A'}</p>
                </div>
                <button 
                  className="btn btn-secondary" 
                  onClick={fetchUserData}
                  disabled={isSubmitting}
                >
                  Refresh Data
                </button>
              </div>
            ) : (
              <p className="no-data">No user data available</p>
            )}
          </section>

          {/* Update User Form */}
          <section className="card">
            <h2>Update User Information</h2>
            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role *</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Enter your role"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update User'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
