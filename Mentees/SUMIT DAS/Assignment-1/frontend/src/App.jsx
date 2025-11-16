import React, { useEffect, useState } from "react";
import { fetchUser, updateUser } from "./Api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/Styles.css"; // Updated styling

export default function App() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

const loadedOnce = React.useRef(false);

async function load() {
  setLoading(true);

  try {
    const data = await fetchUser();
    setUser(data);
    setForm({
      name: data.name || "",
      email: data.email || "",
      role: data.role || ""
    });

    if (!loadedOnce.current) {
      toast.info("User data loaded", { autoClose: 1500 });
      loadedOnce.current = true;
    }

  } catch (err) {


    if (!loadedOnce.current) {
      toast.error(err.message || "Failed to load data");
      loadedOnce.current = true;
    }

  } finally {
    setLoading(false);
  }
}


  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { name: form.name, email: form.email, role: form.role };
      const res = await updateUser(payload);
      setUser(res.user);
      setForm({ name: res.user.name, email: res.user.email, role: res.user.role });
      toast.success("User updated successfully", { autoClose: 1500 });
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="app-wrapper">
      <ToastContainer />

      <header className="header-title">Web3Assam Cohort Assignment 1</header>

      {loading ? (
        <div className="container"><p>Loading user...</p></div>
      ) : (
        <div className="container fade-in">
          <h1 className="main-title">User Editor</h1>

          <section className="card glass-effect">
            <h2>Current User</h2>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </section>

          <section className="card glass-effect">
            <h2>Edit User</h2>
            <form onSubmit={onSubmit} className="form">
              <label>
                Name
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>

              <label>
                Email
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>

              <label>
                Role
                <input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
              </label>

              <div className="button-row">
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? "Saving..." : "Save"}
                </button>
                <button type="button" onClick={load} disabled={saving} className="btn-secondary">
                  Reload
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
