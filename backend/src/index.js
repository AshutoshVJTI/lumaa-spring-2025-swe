const express = require('express');
const cors = require('cors');
require('dotenv').config();

const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 