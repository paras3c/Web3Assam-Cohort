import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"

const app = express();

dotenv.config()

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});
app.use("/api/v1/user", userRoutes);

const PORT= process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});