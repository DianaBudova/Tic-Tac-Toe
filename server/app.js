const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const config = require("./config");
const insert_user = require("./database/insert_user");
const validate_user = require("./database/validate_user");

const app = express();
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: config.db_name,
});
connection.connect();

const port = 4000;

app.use(cors()); // allows to receive incoming HTTP requests from other domains
app.use(express.json()); // allows to receive incoming JSON data from HTTP requests

app.get("/", (request, response) => {
    response.send("Tic-Tac-Toe Game Server!");
});

// TODO: made mistakes
app.post("/validate-user", (request, response) => {
    validate_user.ValidateUser(
        request.body.login,
        request.body.password,
        (resultString) => console.log(resultString),
        (resultBool) => {
            // if (resultBool) {
            //     response.sendStatus(200);
            // } else {
            //     response.sendStatus(500);
            // }
        }
    );
});

app.post("/create-account", (request, response) => {
    insert_user.CreateAccount(
        request.body.login,
        request.body.password,
        (resultString) => console.log(resultString),
        (resultBool) => {
            // if (resultBool) {
            //     response.sendStatus(200);
            // } else {
            //     response.sendStatus(500);
            // }
        }
    );
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
