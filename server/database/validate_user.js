module.exports = {
    ValidateUser: function (login, password, callbackString, callbackBool) {
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
                callbackString(`\x1b[31mDatabase connection failed! ${error}\x1b[37m`);
                callbackBool(false);
                return;
            }
            callbackString("\x1b[32mDatabase connection successful!\x1b[37m");
            callbackBool(true);
        });

        const query = "SELECT * FROM users;";

        connection.query(query, (error, results) => {
            if (error) {
                callbackString("\x1b[31mUnable to validate data!\x1b[37m", error);
                callbackBool(false);
                return;
            }
            results.forEach((item) => {
                if (item.login == login && item.password == password) {
                    callbackString(`\x1b[32mUser "${login}" logged in!\x1b[37m`);
                    callbackBool(true);
                    return;
                }
                callbackString(`\x1b[31mUser "${login}" failed to log in!\x1b[37m`);
                callbackBool(false);
            });
        });

        connection.end();
    },
};
