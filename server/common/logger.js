export default class Logger {
    static buildLogString(message, error = undefined, statusCode = undefined) {
        let logString = `${new Date().toLocaleString()}. ${message}`;
        logString += `${error ? " \x1b[31m" + error + "\x1b[37m" : ""}`;
        logString += `${statusCode ? " Code: " + statusCode : ""}`;
        return logString;
    }
}
