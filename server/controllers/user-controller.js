import connectionDatabase from "../database/connection-database.js";
import hasher from "../common/hasher.js";

export default class UserController {
    validateUser(login, password, callback) {
        const query = "SELECT * FROM users;";
        connectionDatabase.query(query, (error, results) => {
            if (error) {
                callback(
                    `Unable to validate data!`,
                    error,
                    500
                );
            } else {
                let exists = results.some(
                    (item) =>
                        item.login == login &&
                        item.password == hasher.MD5(password)
                );
                if (exists) {
                    callback(
                        `User with login '${login}' logged in!`,
                        undefined,
                        200
                    );
                } else {
                    callback(
                        `User with login '${login}' failed to log in!`,
                        undefined,
                        500
                    );
                }
            }
        });
    }

    createUser(login, password, callback) {
        const query = `INSERT INTO users (login, password) VALUES ('${login}', '${hasher.MD5(
            password
        )}');`;
        if (connectionDatabase.state == "disconnected") {
            connectionDatabase.connect
        }
        connectionDatabase.query(query, (error) => {
            if (error) {
                callback(
                    `User with login '${login}' creation failed!`,
                    error,
                    500
                );
            } else {
                callback(
                    `User with login '${login}' creation successful!`,
                    undefined,
                    200
                );
            }
        });
    }
}
