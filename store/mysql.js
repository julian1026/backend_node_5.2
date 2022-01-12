const mysql = require("mysql");
const config = require("../config");

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.database,
};
//connect

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);

  connection.connect((err) => {
    if (err) {
      console.log(`[db err]`, err);
      setTimeout(handleCon, 2000);
    } else {
      console.log("DB Connected!");
    }
  });

  connection.on("error", (err) => {
    console.log(`[db err]`, err);
    if (err.code == "PROTOCOL_CONNECTION_LOST") {
      handleCon();
    } else {
      throw err;
    }
  });
}

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM ${table} WHERE id=?;`;
    connection.query(sql, id, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

function insert(table, data) {
  console.log("registrando");
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO ${table} SET ?;`;
    connection.query(sql, data, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

function update(table, data) {
  console.log("actualizando");
  return new Promise((resolve, reject) => {
    let sql = `UPDATE ${table} SET ? WHERE id=?;`;
    connection.query(sql, [data, data.id], (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

function upsert(table, data) {
  if (data && data.id) {
    return update(table, data);
  } else {
    return insert(table, data);
  }
}

function query(table, query, join) {
  let joinquery = "";
  if (join) {
    let table2 = Object.keys(join)[0];
    let val = join[table2];
    joinquery = `JOIN ${table2} ON ${table}.${val}=${table2}.id`;
  }

  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM ${table} ${joinquery} WHERE ${table}.?;`;
    connection.query(sql, query, (err, res) => {
      if (err) return reject(err);
      if (joinquery) {
        resolve(res || null);
      } else {
        resolve(res[0] || null);
      }
    });
  });
}

handleCon();

module.exports = { list, upsert, query, insert, update, get };
