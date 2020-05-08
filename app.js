require('dotenv').config();
const express = require('express');

// Router
const userRouter = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(express.json());

app.use('/api/v1/users', userRouter);

const port = process.env.NODE_ENV || 5000;
app.listen(port, () => console.log(`App listen on port: ${port}`));