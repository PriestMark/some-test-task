const express = require("express");
const router = express.Router();
const wSocketController = require("../controllers/wSocketController.js");
const httpCoinApi = require("../controllers/httpCoinApi");
router.get("/price/:id", wSocketController.getPrice);
router.get("/currencies", httpCoinApi.getCurrentciesList);
module.exports = router;
