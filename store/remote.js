const request = require("request");

function createRemoteDB(host, port) {
  let URL = "http://" + host + ":" + port;

  function list(table) {
    return req("GET", table);
  }

  function get(table, id) {
    return req("GET", table, id);
  }

  function insert(table, data) {
    return req("POST", table, data);
  }

  function update(table, data) {
    return req("PUT", table, data);
  }

  function req(method, table, data) {
    let url = URL + "/" + table;
    let body = JSON.stringify(data) || "";
    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: { "Content-type": "application/json" },
          url,
          body,
        },
        (err, req, body) => {
          if (err) {
            console.error("error en la bd remota : ", err);
            return reject(err.message);
          }

          const resp = JSON.parse(body);
          return resolve(resp.body);
        }
      );
    });
  }

  return {
    list,
    get,
    insert,
    update,
  };
}

module.exports = createRemoteDB;
