export default class Logger {
    static buildSuccessString(message, statusCode = undefined) {
        let logString = `${new Date().toLocaleString()}. ${"\x1b[32m" + message + "\x1b[37m"}`;
        logString += `${statusCode ? " Code: " + statusCode : ""}`;
        return logString;
    }

    static buildErrorString(message, error = undefined, statusCode = undefined) {
        let logString = `${new Date().toLocaleString()}. ${"\x1b[31m" + message}`;
        logString += `${error ? " " + error : ""}` + "\x1b[37m";
        logString += `${statusCode ? " Code: " + statusCode : ""}`;
        return logString;
    }
}
