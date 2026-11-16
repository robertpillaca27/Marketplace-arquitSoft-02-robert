
import pool from './src/infraestructure/database/connection.js';

try {
    const result = await pool.query(
        'SELECT current_database() AS database, NOW() AS server_time'
    );

    console.log('Conexión exitosa a PostgreSQL');
    console.log('Base de datos:', result.rows[0].database);
    console.log('Fecha del servidor:', result.rows[0].server_time);

} catch (error) {
    console.error('Error de conexión:', error.message);

} finally {
    await pool.end();
}
