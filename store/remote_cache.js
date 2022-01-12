const remote = require("./remote");
const conf = require("../config");

module.exports = new remote(conf.cache_Service.host, conf.cache_Service.port);
