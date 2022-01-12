const config = require("../config");
const redis = require("redis");

const client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});

function list(table) {
  return new Promise((resolve, reject) => {
    client.get(table, (err, data) => {
      if (err) return reject(err);
      let res = data || null;
      if (data) {
        res = JSON.parse(data);
      }
      return resolve(res);
    });
  });
}

async function get(table, id) {
  return await list(table + "_" + id);
}

async function insert(table, data) {
  let key = table;
  client.setex(key, 10, JSON.stringify(data));
  return true;
}

function update(table, data) {
  let key = table;
  key = key + "_" + data.id;
  client.setex(key, 10, JSON.stringify(data));
  return true;
}

module.exports = {
  list,
  get,
  insert,
  update,
};
