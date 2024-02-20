import logger from "../common/logger.js";
import UserController from "../controllers/user-controller.js";

export default function (app) {
    app.post("/validate-user", (request, response) => {
        let values = request.body;
        new UserController().validateUser(
            values.login,
            values.password,
            (message, error, statusCode) => {
                if (statusCode === 200) {
                    console.log(logger.buildSuccessString(message, statusCode));
                } else {
                    console.log(logger.buildErrorString(message, error, statusCode));
                }
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
                if (statusCode === 200) {
                    console.log(logger.buildSuccessString(message, statusCode));
                } else {
                    console.log(logger.buildErrorString(message, error, statusCode));
                }
                response.sendStatus(statusCode);
            }
        );
    });

    app.post('/get-id-by-login', (request, response) => {
        let reqBody = request.body;
        new UserController().getIdByLogin(
            reqBody.login,
            (message, id, error, statusCode) => {
                if (statusCode === 200) {
                    response.json({"id": id, "statusCode": statusCode});
                    console.log(logger.buildSuccessString(message, statusCode));
                } else {
                    console.log(logger.buildErrorString(message, error, statusCode));
                }
            }
        );
    })
}