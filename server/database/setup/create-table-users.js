import connectionDatabase from "../connection-database.js";
import logger from "../../common/logger.js";

let table_name = "users";
const query = `CREATE TABLE ${table_name} (
        id INT AUTO_INCREMENT PRIMARY KEY UNIQUE, 
        login VARCHAR(255) UNIQUE, 
        password VARCHAR(255)
        );`;

connectionDatabase.query(query, (error) => {
    if (error) {
        let message = `\x1b[31mTable with name '${table_name}' creation failed!\x1b[37m`;
        console.log(logger.buildLogString(message, error));
        return;
    }
    let message = `\x1b[32mTable with name '${table_name}' creation successful!\x1b[37m`;
    console.log(logger.buildLogString(message));
});

connectionDatabase.end();
