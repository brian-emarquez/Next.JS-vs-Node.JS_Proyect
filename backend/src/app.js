const express = require('express');
const usersRoutes = require('./routes/users.routes');

const app = express();

app.use(express.json()); // 👈 OBLIGATORIO para POST

app.use('/api/users', usersRoutes);

module.exports = app;
