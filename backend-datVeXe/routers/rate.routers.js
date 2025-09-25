const express = require("express");
const {getAllRate, createRating, getAllRateByPassengerId, updateRate, deleteRate} = require("../controllers/rate.controller");
const {checkExist} = require("../middlewares/validations/checkExist");
const {Rate} = require("../models");

const RateRouter = express.Router();

RateRouter.post("/", createRating);
RateRouter.get("/", getAllRate);
RateRouter.get("/:passengerId", getAllRateByPassengerId);
RateRouter.put("/:id", updateRate);
RateRouter.delete("/:id", deleteRate);

module.exports = {RateRouter};
