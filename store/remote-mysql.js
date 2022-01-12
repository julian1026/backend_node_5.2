const remote = require("./remote");
const conf = require("../config");

module.exports = new remote(conf.mysqlService.host, conf.mysqlService.port);
