import React, { useState } from "react";
import axios from "axios";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export default function SubmitForm({ onSuccess } = {}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) return setError("Name is required.");
    if (!email.trim() || !emailRegex.test(email.trim())) return setError("A valid email is required.");

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/users", { name: name.trim(), email: email.trim() });
      setSuccess(res.data?.message || "User added successfully");
      setName("");
      setEmail("");
      if (typeof onSuccess === "function") onSuccess(res.data?.user || null);
    } catch (err) {
      if (err.response?.data?.error) setError(err.response.data.error);
      else setError("Failed to submit. Is the backend running on port 3000?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded shadow-sm">
      <h2 className="text-sm font-medium text-slate-800 mb-2">Submit a user to backend</h2>

      <div className="flex gap-2 flex-wrap">
        <input
          className="border rounded px-3 py-2 flex-1 min-w-[160px]"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border rounded px-3 py-2 flex-1 min-w-[200px]"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </div>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      {success && <div className="mt-3 text-sm text-green-600">{success}</div>}
    </form>
  );
}
