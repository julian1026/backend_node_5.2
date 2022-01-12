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

app.listen(conf.cache_Service.port, () => {
  console.log("escuchando redis en el puerto : " + conf.cache_Service.port);
});
