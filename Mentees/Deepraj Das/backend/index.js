const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 30001;

app.use(express.json());

// Path to users.json
const filePath = path.join(__dirname, "users.json");

// Helper: Load JSON file
function loadUsers() {
    try {
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch {
        return []; // return empty array if file doesn't exist or is empty
    }
}

app.get('/', (req, res) => {
    res.status(200).send("Server is up! Web3 Winter Cohort 2025.");
});

app.get('/users', (req, res) => {
    try {
        const users = loadUsers();
        return res.status(200).send(users);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Failed to fetch users" });
    }
});

app.post('/users', (req, res) => {
    try {
        const { name, email } = req.body;

        // Validate
        if (!name || !email) {
            return res.status(400).send({ error: "Name and Email are required" });
        }

        let data = loadUsers(); // Load current users

        // Auto-generate ID
        const newId = data.length + 1;

        const newUser = {
            id: newId,
            name,
            email
        };

        data.push(newUser);

        // Save to file
        fs.writeFile(filePath, JSON.stringify(data, null, 4), (err) => {
            if (err) {
                console.error("File save error:", err);
                return res.status(500).send({ error: "Failed to save user to file" });
            }

            return res.status(201).send({
                message: "User created successfully",
                user: newUser,
                allUsers: data
            });
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to add user" });
    }
});

// server runner
app.listen(PORT, () => {
    console.log("Server is up!");
});
