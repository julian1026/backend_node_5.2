const express = require("express");
const response = require("../network/response");
const store = require("../store/redis");

const router = express.Router();

router.get("/:table", list);
router.get("/:table/:id", get);
router.post("/:table", insert);
router.put("/:table", update);

async function list(req, res, next) {
  let data = await store.list(req.params.table);
  response.success(req, res, data, 201);
}

function get(req, res, next) {
  store
    .get(req.params.table, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((err) => console.error(err));
}

async function insert(req, res, next) {
  let data = await store.insert(req.params.table, req.body);
  response.success(req, res, data, 201);
}

async function update(req, res, next) {
  let data = await store.update(req.params.table, req.body);
  response.success(req, res, data, 201);
}

module.exports = router;
