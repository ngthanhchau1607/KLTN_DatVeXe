const express = require("express");
const {Station} = require("../models");
const {createStation, getAllStation, getDetailStation, updateStation, deleteStation, getAllProvince} = require("../controllers/station.controllers");
const {checkExist} = require("../middlewares/validations/checkExist");
const {authenticate} = require("../middlewares/auth/authenticate");
const {authorize} = require("../middlewares/auth/authorize");
const stationRouter = express.Router();

stationRouter.post("/", authenticate, createStation);
// authorize(["ADMIN"])
stationRouter.get("/province", getAllProvince);

stationRouter.get("/", getAllStation);
stationRouter.get("/:id", getDetailStation);
stationRouter.put("/:id", authenticate, checkExist(Station), updateStation);
stationRouter.delete("/:id", authenticate, checkExist(Station), deleteStation);
module.exports = {
	stationRouter,
};
