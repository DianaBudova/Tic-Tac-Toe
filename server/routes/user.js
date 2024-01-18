import logger from "../common/logger.js";
import UserController from "../controllers/user-controller.js";

export default function (app) {
    app.post("/validate-user", (request, response) => {
        let values = request.body;
        new UserController().validateUser(
            values.login,
            values.password,
            (message, error, statusCode) => {
                console.log(logger.buildLogString(message, error, statusCode));
                response.sendStatus(statusCode);
            }
        );
    });

    app.post('/create-user', (request, response) => {
        let reqBody = request.body;
        new UserController().createUser(
            reqBody.login,
            reqBody.password,
            (message, error, statusCode) => {
                console.log(logger.buildLogString(message, error, statusCode));
                response.sendStatus(statusCode);
            }
        );
    });
}