import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import SubmitForm from "./components/SubmitForm";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      setLoading(true);
      setError(null);
      try {
        // Fetch users from local backend instead of randomuser.me
        const res = await axios.get("http://localhost:3000/users", {
          signal: controller.signal
        });
        setUsers(res.data || []);
      } catch (err) {
        if (axios.isCancel?.(err)) return;
        setError("Failed to load users from backend. Is the backend running on port 3000?");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-800">Users (backend)</h1>
          <p className="text-sm text-slate-500 mt-1">Profiles from your local backend `users.json`</p>
        </header>

        <SubmitForm onSuccess={(newUser) => {
          if (!newUser) return;
          setUsers((prev) => [ ...prev, newUser ]);
        }} />

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div role="status" className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
              <span className="text-sm text-slate-500">Loading users...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-50 border border-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {!loading && !error && (
          <main>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {users.map((u) => (
                <UserCard key={u.login?.uuid || u.email} user={u} />
              ))}
            </div>
          </main>
        )}

        <footer className="mt-8 text-center text-sm text-slate-400">
          Data from randomuser.me • Refresh the page to fetch new users
        </footer>
      </div>
    </div>
  );
}
