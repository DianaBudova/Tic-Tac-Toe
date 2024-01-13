const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const config = require("./config");

const app = express();
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: config.db_name,
});
connection.connect();

const port = 4000;
const query_select_users = "SELECT * FROM users;";

app.use(cors()); // allows to receive incoming HTTP requests from other domains
app.use(express.json()); // allows to receive incoming JSON data from HTTP requests

app.get("/", (request, response) => {
    console.log(`GET "localhost:${port}"`);
    response.send("Tic-Tac-Toe Game Server!");
});

app.post("/", (request, response) => {
    console.log(`POST "localhost:${port}"`);
    let login = request.body.login;
    let password = request.body.password;
    connection.query(query_select_users, (error, results) => {
        if (error) {
            console.log("\x1b[31mUnable to validate data!\x1b[37m", error);
            response.sendStatus(500);
        } else {
            results.forEach((item) => {
                if (item.login == login && item.password == password) {
                    console.log(`\x1b[32mUser "${login}" logged in!\x1b[37m`);
                    response.sendStatus(200);
                    return;
                } else {
                    console.log(`\x1b[31mUser "${login}" failed to log in!\x1b[37m`);
                    response.sendStatus(200);
                }
            });
        }
    });
});

app.listen(
    port,
    console.log(
        `\x1b[32mServer has been started listening on port ${port}\x1b[37m`
    )
).on("error", (error) =>
    console.log(
        `\x1b[31mSome error occured when server has been listening! ${error}\x1b[37m`
    )
);
