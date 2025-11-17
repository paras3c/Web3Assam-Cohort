const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export async function fetchUser() {
  const res = await fetch(`${API_BASE}/api/user`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

export async function updateUser(payload) {
  const res = await fetch(`${API_BASE}/api/user`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data?.errors ? data.errors.join(', ') : data?.error || 'Update failed';
    throw new Error(msg);
  }
  return data;
}
