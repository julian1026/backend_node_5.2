const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");

const conf = require("../config");
// const routes=require('../network/routes');
const errors = require("../network/errors");

const user = require("../api/components/user/network");
const auth = require("../api/components/auth/network");

const app = express();

const swaggerDoc = require("./swagger.json");
app.use(cors());
app.use(bodyParser.json());

// routes(app);
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(errors);

app.listen(conf.api.port, () => {
  console.log("escuchando en el puerto : " + conf.api.port);
});
