import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/user", userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
