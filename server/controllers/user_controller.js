import connectionDB from "../database/connectionDatabase.js";

export default class UserController {
    validateUser(login, password, callback) {
        const query = "SELECT * FROM users;";
        connectionDB.query(query, (error, results) => {
            if (error) {
                callback(
                    `\x1b[31mUnable to validate data!\x1b[37m`,
                    error,
                    500
                );
            } else {
                let exists = results.some(
                    (item) => item.login == login && item.password == password
                );
                if (exists) {
                    callback(
                        `\x1b[32mUser with login '${login}' logged in!\x1b[37m`,
                        undefined,
                        200
                    );
                } else {
                    callback(
                        `\x1b[31mUser with login '${login}' failed to log in!\x1b[37m`,
                        undefined,
                        500
                    );
                }
            }
        });
    }

    createUser(login, password, callback) {
        const query = `INSERT INTO users (login, password) VALUES ('${login}', '${password}');`;
        connectionDB.query(query, (error) => {
            if (error) {
                callback(
                    `\x1b[31mUser with login '${login}' creation failed!\x1b[37m`,
                    error,
                    500
                );
            } else {
                callback(
                    `\x1b[32mUser with login '${login}' creation successful!\x1b[37m`,
                    undefined,
                    200
                );
            }
        });
    }
}
