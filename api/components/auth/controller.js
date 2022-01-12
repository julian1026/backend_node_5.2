const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const auth = require("../../../auth/index");
const TABLE = "auth";

module.exports = function (injectStore) {
  let store = injectStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  const post = async (data, flag) => {
    const dataAuth = {
      id: data.id,
    };
    if (data.username) {
      dataAuth.username = data.username;
    }
    if (data.password) {
      dataAuth.password = await bcrypt.hash(data.password, 5);
    }
    if (flag) {
      return store.update(TABLE, dataAuth);
    }
    return store.insert(TABLE, dataAuth);
  };

  const login = async (username, password) => {
    let data = await store.query(TABLE, { username: username });

    return bcrypt.compare(password, data.password).then((sonIguales) => {
      if (sonIguales === true) {
        return auth.sign({ ...data });
      } else {
        throw new Error("informacion invalida");
      }
    });
  };

  return {
    post,
    login,
  };
};
