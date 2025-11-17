import { useState } from "react";
import { updateUser } from "../api";

export default function UserForm({ user, setUser, showToast }) {
  const [form, setForm] = useState(user);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const result = await updateUser(form);   // <-- PUT REQUEST

    if (result.user) {
      setUser(result.user);                  // Update UI
      showToast("User updated successfully");
    } else {
      showToast("Error updating user");
    }

    setLoading(false);
  }

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <h2>Update User</h2>

      <label>Name</label>
      <input name="name" value={form.name} onChange={handleChange} />

      <label>Email</label>
      <input type="email" name="email" value={form.email} onChange={handleChange} />

      <label>Role</label>
      <input name="role" value={form.role} onChange={handleChange} />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
