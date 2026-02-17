const sql = require('mssql');

const dbSettings = {
  user: 'brian',                // o tu usuario
  password: 'briandb',
  server: 'localhost', // ajusta según tu caso
  database: 'NextNodeDB',
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error('❌ Error SQL:', error);
  }
}

module.exports = { getConnection };
