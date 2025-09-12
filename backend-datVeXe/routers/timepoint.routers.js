const express = require("express");
const {getTimePointByTrip, CreateTimePointByTrip, GetTimePointDetail,getPickupsAndDropoffsByTrip} = require("../controllers/timePoint.controller");

const {checkExist} = require("../middlewares/validations/checkExist");
const {TimePoint} = require("../models");

const TimePointRouter = express.Router();

TimePointRouter.get("/", getTimePointByTrip);
TimePointRouter.get("/:id", GetTimePointDetail); 
TimePointRouter.get("/byTrip/:tripPassengerId", getPickupsAndDropoffsByTrip);

TimePointRouter.post("/", CreateTimePointByTrip);
module.exports = {TimePointRouter};
