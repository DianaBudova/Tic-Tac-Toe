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
        logger.buildSuccessString(
            `Server has been started listening on port ${port}.`
        )
    )
).on("error", (error) =>
    console.log(
        logger.buildErrorString(
            `Some error occured while trying to start listening! ${error}`
        )
    )
);
