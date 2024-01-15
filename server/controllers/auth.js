import mysql from "mysql";
import config from "../config/config.json" assert { type: "json" };

export function validateUser(login, password) {
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

    const query = "SELECT * FROM users;";
    connection.query(query, (error, results) => {
        if (error) {
            console.log(`\x1b[31mUnable to validate data!\n${error}\x1b[37m`);
        } else {
            let isPresent = false;
            results.forEach((item) => {
                if (item.login == login && item.password == password) {
                    isPresent = true;
                }
            });
            if (isPresent) {
                console.log(`\x1b[32mUser "${login}" logged in!\x1b[37m`);
            } else {
                console.log(`\x1b[31mUser "${login}" failed to log in!\x1b[37m`);
            }
        }
    });

    connection.end();
}
