module.exports = {
    CreateAccount: function (login, password, callbackString, callbackBool) {
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

        const query = `INSERT INTO users (login, password) VALUES ('${login}', '${password}');`;

        connection.query(query, (error) => {
            if (error) {
                callbackString(`\x1b[31mUser "${login}" creation failed! ${error}\x1b[37m`);
                callbackBool(false);
                return;
            }
            callbackString(`\x1b[32mUser "${login}" creation successful!\x1b[37m`);
            callbackBool(true);
        });

        connection.end();
    },
};
