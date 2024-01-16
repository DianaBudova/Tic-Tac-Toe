import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import logger from "./common/logger.js";
import config from "./config/config.json" assert { type: "json" };

const app = express();

app.use(cors()); // allows to receive incoming HTTP requests from other domains
app.use(express.json()); // allows to receive incoming JSON data from HTTP requests

routes(app);

const port = config.server.port;

app.listen(
    port,
    config.server.host,
    console.log(
        logger.buildLogString(
            `\x1b[32mServer has been started listening on port ${port}.\x1b[37m`
        )
    )
).on('error', (error) =>
    console.log(
        logger.buildLogString(
            `\x1b[31mSome error occured while trying to start listening! ${error}\x1b[37m`
        )
    )
);
