const express = require("express");
const {getTripSeatsByTripPassengerId} = require("../controllers/tripseat.controller");
const {TripSeat} = require("../models");

const tripSeatRouter = express.Router();

tripSeatRouter.get("/:tripPassengerId", getTripSeatsByTripPassengerId);

module.exports = {tripSeatRouter};
