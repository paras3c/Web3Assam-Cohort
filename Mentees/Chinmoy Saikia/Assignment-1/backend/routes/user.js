import express from "express";
import { readUserData, writeUserData } from "../utils/fileHelper.js";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  const users = await readUserData();
  res.json({ success: true, data: users });
});

// CREATE user
router.post("/", async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, error: "Name and email required" });
  }

  const users = await readUserData();
  const newUser = {
    id: Date.now(),
    name,
    email,
    role: role || "User"
  };

  users.push(newUser);
  await writeUserData(users);

  res.status(201).json({ success: true, data: newUser });
});

// UPDATE user
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, email, role } = req.body;

  const users = await readUserData();
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  users[index] = { id, name, email, role };
  await writeUserData(users);

  res.json({ success: true, data: users[index] });
});

// DELETE user
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const users = await readUserData();

  const filtered = users.filter(u => u.id !== id);

  await writeUserData(filtered);

  res.json({ success: true, message: "User deleted" });
});

export default router;
