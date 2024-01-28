import mysql from "mysql";
import config from "../../config/config.json" assert { type: "json" };

var connectionHost = mysql.createConnection({
    host: config.server.host,
    user: config.database.user,
    password: config.database.password,
});

export default connectionHost;
