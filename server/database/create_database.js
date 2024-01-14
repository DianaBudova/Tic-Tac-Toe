function CreateDatabase() {
    const mysql = require("mysql");
    const config = require("../config.js");

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
    });

    connection.connect((error) => {
        if (error) {
            console.log("\x1b[31mServer connection failed!\x1b[37m", error);
            return;
        }
        console.log("\x1b[32mServer connection successful!\x1b[37m");
    });

    let db_name = config.db_name;
    const query = `CREATE DATABASE ${db_name};`;

    connection.query(query, (error) => {
        if (error) {
            console.log(`\x1b[31mDatabase "${db_name}" creation failed!\x1b[37m`, error);
            return;
        }
        console.log(
            `\x1b[32mDatabase "${db_name}" creation successful!\x1b[37m`
        );
    });

    connection.end();
}

CreateDatabase();
