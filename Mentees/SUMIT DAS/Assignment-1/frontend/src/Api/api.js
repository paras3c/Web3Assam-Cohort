const BACKEND_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export async function fetchUser() {
  const res = await fetch(`${BACKEND_BASE}/api/user`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to fetch user');
  }
  return res.json();
}

export async function updateUser(payload) {
  const res = await fetch(`${BACKEND_BASE}/api/user`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Update failed');
  }
  return data;
}
