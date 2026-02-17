const sql = require('mssql');

const config = {
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

const getConnection = async () => {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (error) {
    console.error('❌ Error conexión SQL:', error);
  }
};

module.exports = {
  sql,
  getConnection
};
