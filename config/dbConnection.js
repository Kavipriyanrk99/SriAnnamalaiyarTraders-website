require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            database: process.env.DATABASE_NAME,
            port: process.env.DATABASE_PORT,
            password: process.env.DATABASE_PASSWORD,
        });

const getPool = async() => {
    const connection = await pool.getConnection();
    connection.release();

    return pool;
}

module.exports = { getPool};