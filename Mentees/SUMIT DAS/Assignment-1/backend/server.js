import express from 'express';
import cors from 'cors';
import path from 'path';

import userRouter from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'User API running' });
});

app.use('/api/user', userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
  console.log(`GET http://localhost:${PORT}/api/user`);
});
