const auth = require("../auth/index");
const { nanoid } = require("nanoid");

const TABLE = "users";

module.exports = function (injectStore, injectCache) {
  let store = injectStore;
  let cache = injectCache;
  if (!store) {
    store = require("../../../store/dummy");
  }
  if (!cache) {
    cache = require("../../../store/dummy");
  }

  const list = async () => {
    let users = await cache.list(TABLE);
    if (!users) {
      console.log("no estaba en cache, buscando en db");
      users = await store.list(TABLE);
      cache.insert(TABLE, users);
    } else {
      console.log("nos traemos datos de la cache");
    }
    return users;
  };

  const get = (id) => {
    return store.get(TABLE, id);
  };

  const post = async (data) => {
    let flag = false;
    const user = {
      name: data.name,
      username: data.username,
    };
    if (data.id) {
      user.id = data.id;
      flag = true;
    } else {
      user.id = nanoid();
    }
    if (data.username || data.password) {
      await auth.post(
        {
          id: user.id,
          username: user.username,
          password: data.password,
        },
        flag
      );
    }
    if (flag) {
      return store.update(TABLE, user);
    }
    return store.insert(TABLE, user);
  };

  const del = (id) => {
    if (!id) {
      return Promise.reject("falta dato");
    }
    return store.remove(TABLE, id);
  };

  const follow = (from, to) => {
    return store.upsert(TABLE + "_follow", { user_from: from, user_to: to });
  };

  const following = async (id) => {
    const join = {};
    join[TABLE] = "user_to";
    const query = { user_from: id };

    return await store.query(TABLE + "_follow", query, join);
  };
  return {
    list,
    get,
    post,
    del,
    follow,
    following,
  };
};
