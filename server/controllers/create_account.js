import mysql from "mysql";
import config from "../config/config.json" assert { type: "json" };

export function createAccount(login, password) {
    const connection = mysql.createConnection({
        host: config.server.host,
        user: "root",
        password: "",
        database: config.database.name,
    });

    connection.connect((error) => {
        if (error) {
            console.log(`\x1b[31mDatabase connection failed!\n${error}\x1b[37m`);
        } else {
            console.log("\x1b[32mDatabase connection successful!\x1b[37m");
        }
    });

    const query = `INSERT INTO users (login, password) VALUES ('${login}', '${password}');`;
    connection.query(query, (error, results) => {
        if (error) {
            console.log(
                `\x1b[31mUser "${login}" creation failed!\n${error}\x1b[37m`
            );
        } else {
            console.log(`\x1b[32mUser "${login}" creation successful!\x1b[37m`);
        }
    });

    connection.end();
}
