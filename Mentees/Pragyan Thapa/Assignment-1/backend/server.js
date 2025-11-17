import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, "data.json");

function initializeDataFile() {
  if (!fs.existsSync(dataFilePath)) {
    const defaultData = {
      name: "John Doe",
      email: "john@example.com",
      role: "Developer"
    };
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
    console.log("data.json created automatically.");
  }
}

initializeDataFile();

app.get("/api/user", (req, res) => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Failed to read data.json" });
  }
});

app.put("/api/user", (req, res) => {
  const { name, email, role } = req.body;

  if (!name && !email && !role) {
    return res.status(400).json({ error: "No fields provided for update" });
  }

  try {
    const currentData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

    const updatedData = {
      ...currentData,
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role })
    };

    fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2));
    res.json({ message: "User updated successfully", data: updatedData });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
