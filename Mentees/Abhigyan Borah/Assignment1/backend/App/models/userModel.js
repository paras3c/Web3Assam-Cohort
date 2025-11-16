const fs = require("fs").promises;
const path = require("path");

const DATA_FILE = path.join(__dirname, "../../users.json");

async function readUsers() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeUsers(users) {
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), "utf8");
}

module.exports = {
  readUsers,
  writeUsers,
};
