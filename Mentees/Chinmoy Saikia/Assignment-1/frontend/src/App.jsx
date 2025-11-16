import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "./api";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", email: "", role: "" });
  const [message, setMessage] = useState("");

  // Load users on startup
  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
    }
    fetchUsers();
  }, []);
  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Create User
  async function handleCreate(e) {
    e.preventDefault();
    await createUser(form);
    await loadUsers();

    setMessage("User created successfully!");
    resetForm();
  }

  // Update User
  async function handleUpdate() {
    await updateUser(form.id, form);
    await loadUsers();

    setMessage("User updated successfully!");
    resetForm();
  }

  // Delete User
  async function handleDelete(id) {
    await deleteUser(id);
    await loadUsers();

    setMessage("User deleted!");
  }

  // Reset form
  function resetForm() {
    setForm({ id: null, name: "", email: "", role: "" });
    setTimeout(() => setMessage(""), 2000);
  }

  // Select user for editing
  function selectUser(user) {
    setForm(user);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Management Dashboard</h1>

      {message && <div style={styles.message}>{message}</div>}

      {/* USER FORM */}
      <form style={styles.form} onSubmit={form.id ? (e) => e.preventDefault() : handleCreate}>
        <h2 style={styles.formTitle}>
          {form.id ? "Update User" : "Create New User"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Enter role"
          value={form.role}
          onChange={handleChange}
          style={styles.input}
          required
        />

        {form.id ? (
          <>
            <button type="button" onClick={handleUpdate} style={styles.updateBtn}>
              Update User
            </button>
            <button type="button" onClick={resetForm} style={styles.cancelBtn}>
              Cancel Edit
            </button>
          </>
        ) : (
          <button type="submit" style={styles.createBtn}>
            Add User
          </button>
        )}
      </form>

      {/* USER LIST */}
      <div style={styles.listContainer}>
        <h2 style={styles.sectionTitle}>All Users</h2>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={styles.tr}>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.role}</td>
                  <td style={styles.actionTd}>
                    <button
                      onClick={() => selectUser(user)}
                      style={styles.editBtn}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "bold",
    fontSize: "28px",
  },
  message: {
    background: "#d4edda",
    padding: "10px",
    borderRadius: "6px",
    color: "#155724",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    background: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  formTitle: { marginBottom: "15px" },
  input: {
    marginBottom: "12px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  createBtn: {
    background: "#007bff",
    color: "white",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    marginTop: "10px",
  },
  updateBtn: {
    background: "#28a745",
    color: "white",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    marginTop: "10px",
  },
  cancelBtn: {
    background: "gray",
    color: "white",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    marginTop: "10px",
  },
  sectionTitle: { marginBottom: "10px" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "10px",
    textAlign: "left",
  },
  tr: { borderBottom: "1px solid #ddd" },
  td: { padding: "10px" },
  actionTd: { padding: "10px", display: "flex", gap: "10px" },
  editBtn: {
    background: "#ffc107",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default App;
