import connectionHost from "./connection-host.js";
import config from "../../config/config.json" assert { type: "json" };
import logger from "../../common/logger.js";

let db_name = config.database.name;
const query = `CREATE DATABASE ${db_name};`;

connectionHost.query(query, (error) => {
    if (error) {
        let message = `Database with name '${db_name}' creation failed!`;
        console.log(logger.buildErrorString(message, error));
        return;
    }
    let message = `Database with name '${db_name}' creation successful!`;
    console.log(logger.buildSuccessString(message));
});

connectionHost.end();
