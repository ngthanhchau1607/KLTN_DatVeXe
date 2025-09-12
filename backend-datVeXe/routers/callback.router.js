const express = require("express");
const {paymentCallback} = require("../controllers/pay.controller");

const CallBack = express.Router();

CallBack.post("/", paymentCallback);

module.exports = {CallBack};
