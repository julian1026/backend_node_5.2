const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const conf = require("../config");
const routes = require("./network");
const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/", routes);

app.listen(conf.mysqlService.port, () => {
  console.log("escuchando mysql en el puerto : " + conf.mysqlService.port);
});
