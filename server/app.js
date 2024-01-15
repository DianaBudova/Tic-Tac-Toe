import express from "express";
import cors from "cors";
import mysql from "mysql";
import config from "./config/config.json" assert { type: "json" };
import { validateUser } from "./controllers/auth.js";
import { createAccount } from "./controllers/create_account.js";

const app = express();
mysql
    .createConnection({
        host: config.server.port,
        user: "root",
        password: "",
        database: config.database.name,
    })
    .connect();

app.use(cors()) // allows to receive incoming HTTP requests from other domains
    .use(express.json()); // allows to receive incoming JSON data from HTTP requests

app.get("/", (request, response) => {
    response.send("Tic-Tac-Toe Game Server!");
});

app.post("/validate-user", (request, response) => {
    validateUser(request.body.login, request.body.password);
    //TODO send status
});

app.post("/create-account", (request, response) => {
    createAccount(request.body.login, request.body.password);
});

app.listen(
    config.server.port,
    console.log(
        `\x1b[32mServer has been started listening on port ${config.server.port}\x1b[37m`
    )
).on("error", (error) =>
    console.log(
        `\x1b[31mSome error occured when server has been listening! ${error}\x1b[37m`
    )
);
