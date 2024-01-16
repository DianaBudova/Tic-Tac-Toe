import mysql from "mysql";
import config from "../config/config.json" assert { type: "json" };

var connectionDatabase = mysql.createConnection({
    host: config.server.host,
    user: "root",
    password: "",
    database: config.database.name,
});

export default connectionDatabase;
