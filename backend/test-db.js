const { getConnection } = require('./src/config/database');

(async () => {
  const pool = await getConnection();
  if (pool) {
    console.log('✅ Conectado a SQL Server 2025');
    process.exit(0);
  }
})();
