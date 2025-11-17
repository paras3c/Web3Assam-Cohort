const API_URL = import.meta.env.VITE_API_BASE || "http://localhost:5000/api/user";

// GET user
export async function getUser() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch user");

  const json = await response.json();
  return json.user; // <-- FIXED
}

// UPDATE user
export async function updateUser(updates) {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  return response.json();
}
