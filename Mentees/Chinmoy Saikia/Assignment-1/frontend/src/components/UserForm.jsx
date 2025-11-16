import { useState } from "react";
import { updateUserData } from "../api";

function UserForm({ user, setUser }) {
  const [form, setForm] = useState(user);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await updateUserData(form);
    if (result.data) {
      setUser(result.data);
      setMessage("User updated successfully!");
      setTimeout(() => setMessage(""), 2000);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        width: "300px",
      }}
    >
      <h3>Update User</h3>

      <label>Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Role</label>
      <input
        type="text"
        name="role"
        value={form.role}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          background: "black",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Update
      </button>

      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
    </form>
  );
}

export default UserForm;
