const express = require("express");
const cityController = require('../src/controllers/city.controller');
const router = express.Router();

router.get("/", (req, res) => cityController.getCityCoordinates(req, res));

module.exports = router;