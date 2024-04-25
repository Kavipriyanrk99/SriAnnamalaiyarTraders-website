require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
            host: process.env.DATABASE_OST,
            user: process.env.DATABASE_USER,
            database: process.env.DATABASE_NAME,
            port: process.env.DATABASE_PORT,
            password: process.env.DATABASE_PASSWORD,
        });

// const getPool = async() => {
//     try{
//         const connection = await pool.getConnection();
//         connection.release();

//         console.log('MySQL connection pool created');

//         return pool;
//     } catch(error){
//         console.log(error);
//     }
// }

const getPool = async() => {
    const connection = await pool.getConnection();
    connection.release();

    console.log('MySQL connection pool created');

    return pool;
}

module.exports = { getPool};