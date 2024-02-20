import connectionDatabase from "../database/connection-database.js";

export default class StatisticController {
    createStatistic(login_id, callback) {
        const query = `INSERT INTO statistic (login_id, wins, failures, games) VALUES ('${login_id}', '0', '0', '0');`;
        connectionDatabase.query(query, (error) => {
            if (error) {
                callback(
                    `Statistic of user with login id '${login_id}' creation failed!`,
                    error,
                    500
                );
            } else {
                callback(
                    `Statistic of user with login id '${login_id}' creation successful!`,
                    undefined,
                    200
                );
            }
        });
    }

    getStatisticById(login_id, callback) {
        const query = `SELECT wins, failures, games FROM statistic WHERE login_id = '${login_id}';`;
        connectionDatabase.query(query, (error, results) => {
            if (error || results.length === 0) {
                callback(
                    `Statistic of user with login id '${login_id}' was not got!`,
                    undefined,
                    error,
                    500
                );
            } else {
                callback(
                    `Statistic of user with login id '${login_id}' was got!`,
                    results[0],
                    undefined,
                    200
                );
            }
        });
    }
}