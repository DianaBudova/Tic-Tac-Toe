import connectionDatabase from "../connection-database.js";
import logger from "../../common/logger.js";

let table_name = "statistic";
const query = `CREATE TABLE ${table_name} (
        id INT AUTO_INCREMENT PRIMARY KEY UNIQUE, 
        login_id INT UNIQUE,
        wins INT DEFAULT 0,
        failures INT DEFAULT 0,
        games INT DEFAULT 0,
        FOREIGN KEY (login_id) REFERENCES users(id)
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
