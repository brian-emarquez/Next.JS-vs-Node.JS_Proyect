const { getConnection, sql } = require("../config/database");

// GET - listar usuarios
const getUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("SELECT id, name, email FROM users");

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - crear usuario
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: 'Nombre y email son obligatorios'
      });
    }

    const pool = await getConnection();

    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .query(`
        INSERT INTO users (name, email)
        VALUES (@name, @email)
      `);

    res.status(201).json({
      message: 'Usuario creado correctamente'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

module.exports = {
  getUsers,
  createUser
};