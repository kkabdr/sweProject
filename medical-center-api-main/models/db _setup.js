const Pool = require("pg").Pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1",
    database: "swe",
    port:5432
})

module.exports = pool