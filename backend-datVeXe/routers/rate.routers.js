const express = require("express");
const { getAllRate, createRating ,getAllRateByPassengerId} = require("../controllers/rate.controller");
const { checkExist } = require("../middlewares/validations/checkExist");
const { Rate } = require("../models");

const RateRouter = express.Router();

RateRouter.post("/", createRating);
RateRouter.get("/", getAllRate);
RateRouter.get("/:passengerId", getAllRateByPassengerId);


module.exports = { RateRouter };
