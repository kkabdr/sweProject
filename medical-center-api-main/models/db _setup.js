const Pool = require("pg").Pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "admin",
    database: "swe",
    port:5432
})

module.exports = pool