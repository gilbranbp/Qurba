const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dbConfig: {
        connectionLimit: 10,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        multipleStatements: true
    },
    esConfig: {
        node: process.env.ES_HOST,
        auth: {
            username: process.env.ES_USERNAME,
            password: process.env.ES_PASSWORD
        },
        requestTimeout: 60000,
    },
    jwt:process.env.JWT,
};