function CreateTableUsers() {
    const mysql = require("mysql");
    const config = require("../config.js");

    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: config.db_name,
    });

    connection.connect((error) => {
        if (error) {
            console.log("\x1b[31mDatabase connection failed!\x1b[37m", error);
            return;
        }
        console.log("\x1b[32mDatabase connection successful!\x1b[37m");
    });

    let table_name = "users";
    const query = `CREATE TABLE ${table_name} (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        login VARCHAR(255) UNIQUE, 
        password VARCHAR(255)
        );`;

    connection.query(query, (error) => {
        if (error) {
            console.log(
                `\x1b[31mTable ${table_name} creation failed!\x1b[37m`, error);
            return;
        }
        console.log(
            `\x1b[32mTable "${table_name}" creation successful!\x1b[37m`
        );
    });

    connection.end();
}

CreateTableUsers();
