const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const conf = require("../config");
const routes = require("./components/post/network");
const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/post", routes);

app.listen(conf.post.port, () => {
  console.log("escuchando en el puerto : " + conf.post.port);
});
