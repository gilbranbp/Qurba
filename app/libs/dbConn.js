const util = require('util')
const mysql = require('mysql2')
const config = rootRequire('/app/config');
const pool = mysql.createPool(config.dbConfig)

// Ping database untuk memeriksa kesalahan.
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Koneksi database ditutup.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Basis data memiliki terlalu banyak koneksi.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Koneksi database ditolak.')
        }
    }
    if (connection) connection.release()
    return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)
module.exports = pool;

