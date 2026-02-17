const { getConnection, sql } = require('../config/database');

/* =======================
GET - listar usuarios
======================= */

const getUsers = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(
      'SELECT id, name, email FROM users'
    );

    res.json(result.recordset);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

/* =======================
POST - crear usuario
======================= */

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

/* =======================
   UPDATE USER (PUT)
======================= */
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const pool = await getConnection();

    await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar, name)
      .input('email', sql.NVarChar, email)
      .query(`
        UPDATE Users
        SET name = @name,
            email = @email
        WHERE id = @id
      `);

    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

/* =======================
   DELETE USER (DELETE)
======================= */
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await getConnection();

    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Users WHERE id = @id');

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};