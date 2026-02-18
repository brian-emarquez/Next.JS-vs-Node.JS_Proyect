const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/users.routes');

const app = express();


app.use(express.json()); // 👈 OBLIGATORIO para POST
app.use('/api/users', usersRoutes);

app.use(cors()); // 👈 ESTA LÍNEA ES LA CLAVE
app.use(express.json());

module.exports = app;
