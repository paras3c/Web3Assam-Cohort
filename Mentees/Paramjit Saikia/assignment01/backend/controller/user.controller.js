
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const FILE = path.join(__dirname, "../data.json");


 const register = (req, res) => {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userData = { name, email, role };


    fs.writeFileSync(FILE, JSON.stringify(userData, null, 2), "utf8");

    return res.status(201).json({
        message: "User registered successfully",
        data: userData
    });
};


const getUser = (req, res) => {
    if (!fs.existsSync(FILE)) {
        return res.status(404).json({ message: "No user data found" });
    }

    const data = JSON.parse(fs.readFileSync(FILE, "utf8"));

    return res.status(200).json(data);
};


const updateUser = (req, res) => {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!fs.existsSync(FILE)) {
        return res.status(404).json({ message: "User data not found" });
    }

   
    const newData = { name, email, role };

    fs.writeFileSync(FILE, JSON.stringify(newData, null, 2), "utf8");

    return res.status(200).json({
        message: "User updated successfully",
        data: newData
    });
};


export {register,getUser,updateUser}