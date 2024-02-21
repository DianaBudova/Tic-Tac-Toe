import logger from "../common/logger.js";
import StatisticController from "../controllers/statistic-controller.js";

export default function (app) {
    app.post('/create-statistic', (request, response) => {
        let reqBody = request.body;
        new StatisticController().createStatistic(
            reqBody.login_id,
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

    app.post('/get-statistic-by-id', (request, response) => {
        let reqBody = request.body;
        new StatisticController().getStatisticById(
            reqBody.login_id,
            (message, data, error, statusCode) => {
                if (statusCode === 200) {
                    response.json({data, "statusCode": statusCode});
                    console.log(logger.buildSuccessString(message, statusCode));
                } else {
                    console.log(logger.buildErrorString(message, error, statusCode));
                    response.sendStatus(statusCode);
                }
            }
        );
    });

    app.patch('/update-wins', (request, response) => {
        new StatisticController().updateWins(
            request.body.login_id,
            request.body.wins,
            (message, error, statusCode) => {
                if (statusCode === 200) {
                    console.log(logger.buildSuccessString(message, statusCode));
                } else {
                    console.log(logger.buildErrorString(message, error, statusCode));
                }
                response.sendStatus(statusCode);
            }
        )
    });

    app.patch('/update-failures', (request, response) => {
        new StatisticController().updateFailures(
            request.body.login_id,
            request.body.failures,
            (message, error, statusCode) => {
                if (statusCode === 200) {
                    console.log(logger.buildSuccessString(message, statusCode));
                } else {
                    console.log(logger.buildErrorString(message, error, statusCode));
                }
                response.sendStatus(statusCode);
            }
        )
    });

    app.patch('/update-games', (request, response) => {
        new StatisticController().updateGames(
            request.body.login_id,
            request.body.games,
            (message, error, statusCode) => {
                if (statusCode === 200) {
                    console.log(logger.buildSuccessString(message, statusCode));
                } else {
                    console.log(logger.buildErrorString(message, error, statusCode));
                }
                response.sendStatus(statusCode);
            }
        )
    });
}