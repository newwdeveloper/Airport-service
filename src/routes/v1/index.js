const express = require("express");

const { InfoController } = require("../../controllers");

const airplaneRoutes = require("./airplane-routes");
const cityRouter = require("./city-routes");
const airportRouter = require("./airport-routes");

const router = express.Router();

router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRouter);
router.use("/airports", airportRouter);

router.get("/info", InfoController.info);

module.exports = router;
