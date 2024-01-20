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
        let message = `Table with name '${table_name}' creation failed!`;
        console.log(logger.buildErrorString(message, error));
        return;
    }
    let message = `Table with name '${table_name}' creation successful!`;
    console.log(logger.buildSuccessString(message));
});

connectionDatabase.end();
