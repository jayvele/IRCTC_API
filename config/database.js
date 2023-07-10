const {createPool} = require("mysql");

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.HOST,
    
    // user: process.env.USER,
    
    password: process.env.PASS,
    database: process.env.MYSQL_DB,
    // port: 3306,
    // host: 'localhost',
    user: 'root',
    // password: "",
    // database: 'test',
    connectionLimit: 10
})

module.exports = pool;