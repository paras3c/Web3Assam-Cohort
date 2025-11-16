const API_URL = "http://localhost:5000/api/user";

export async function getUsers() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.data; // returns array
}

export async function createUser(user) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function updateUser(id, user) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
