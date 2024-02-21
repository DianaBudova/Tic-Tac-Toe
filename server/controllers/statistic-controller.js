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

    updateWins(login_id, wins, callback) {
        const query = `UPDATE statistic SET wins = '${wins}' WHERE login_id = '${login_id}';`;
        connectionDatabase.query(query, (error) => {
            if (error) {
                callback(
                    `Winning statistic of user with login id '${login_id}' update failed!`,
                    error,
                    500
                );
            } else {
                callback(
                    `Winning statistic of user with login id '${login_id}' update successful!`,
                    undefined,
                    200
                );
            }
        });
    }

    updateFailures(login_id, failures, callback) {
        const query = `UPDATE statistic SET failures = '${failures}' WHERE login_id = '${login_id}';`;
        connectionDatabase.query(query, (error) => {
            if (error) {
                callback(
                    `Failing statistic of user with login id '${login_id}' update failed!`,
                    error,
                    500
                );
            } else {
                callback(
                    `Failing statistic of user with login id '${login_id}' update successful!`,
                    undefined,
                    200
                );
            }
        });
    }

    updateGames(login_id, games, callback) {
        const query = `UPDATE statistic SET games = '${games}' WHERE login_id = '${login_id}';`;
        connectionDatabase.query(query, (error) => {
            if (error) {
                callback(
                    `Games amount statistic of user with login id '${login_id}' update failed!`,
                    error,
                    500
                );
            } else {
                callback(
                    `Games amount statistic of user with login id '${login_id}' update successful!`,
                    undefined,
                    200
                );
            }
        });
    }
}