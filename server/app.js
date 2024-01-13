const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors()); // allows to receive incoming HTTP requests from other domains
app.use(express.json()); // allows to receive incoming JSON data from HTTP requests

app.get("/", (request, response) => {
  response.send("Tic-Tac-Toe Game Server!");
  console.log(`GET "localhost:${port}"`);
});

app.post("/", (request, response) => {
  response.sendStatus(200);
  console.log(request.body);
  console.log(`POST "localhost:${port}"`);
});

app.listen(
  port,
  console.log(`Server has been started listening on port ${port}`)
);

//