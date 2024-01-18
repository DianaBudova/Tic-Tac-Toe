import connectionHost from "./connection-host.js";
import config from "../../config/config.json" assert { type: "json" };
import logger from "../../common/logger.js";

let db_name = config.database.name;
const query = `CREATE DATABASE ${db_name};`;

connectionHost.query(query, (error) => {
    if (error) {
        let message = `\x1b[31mDatabase with name '${db_name}' creation failed!\x1b[37m`;
        console.log(logger.buildLogString(message, error));
        return;
    }
    let message = `\x1b[32mDatabase with name '${db_name}' creation successful!\x1b[37m`;
    console.log(logger.buildLogString(message));
});

connectionHost.end();
