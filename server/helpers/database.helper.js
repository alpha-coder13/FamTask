const PG= require("pg");
const FORMAT= require("pg-format");

const POOL = new PG.Pool({
    user: "postgres",
    password: "test123",
    database: "directory",
    table: "details",
    host: "postgres",
    port: 5432
});


module.exports = { 
    POOL, 
    FORMAT 
};
