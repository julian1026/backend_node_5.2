const express = require("express");
const response = require("../../../network/response");
const controller = require("./index");
const secure = require("../../../api/components/user/secure");
const router = express.Router();

router.get("/", list);
router.get("/:id", get);
router.post("/", secure("follow"), upsert);
router.put("/", secure("follow"), update);

function list(req, res, next) {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function get(req, res, next) {
  controller
    .query(req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function upsert(req, res, next) {
  controller
    .add(req.user.id, req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function update(req, res, next) {
  controller
    .update(req.user.id, req.body)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

module.exports = router;
