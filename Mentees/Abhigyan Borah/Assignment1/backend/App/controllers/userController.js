const { readUsers, writeUsers } = require("../models/userModel");

const getUsers = async (req, res, next) => {
  try {
    const users = await readUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const users = await readUsers();

    const exists = users.some(u => u.email && u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const maxId = users.length === 0 ? 0 : Math.max(...users.map(u => u.id || 0));
    const nextId = maxId + 1;

    const newUser = {
      id: nextId,
      name,
      email
    };

    users.push(newUser);
    await writeUsers(users);

    res.status(201).json({
      message: "User added successfully",
      user: newUser
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  createUser
};
