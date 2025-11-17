const express = require("express");
const cors = require("cors");
const app = express();
const errorHandler = require("./App/middleware/errorHandler");



app.use(express.json());
app.use(cors());
app.use(errorHandler);


const userRoutes = require("./App/routes/userRoutes");
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
