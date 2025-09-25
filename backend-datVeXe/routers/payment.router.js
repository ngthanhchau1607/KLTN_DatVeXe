const express = require("express");
const {paymentController, paymentCallback, checkPaymentStatus} = require("../controllers/pay.controller");

const PaymentRouter = express.Router();

PaymentRouter.post("/", paymentController);
PaymentRouter.post("/callback", paymentCallback);
PaymentRouter.get("/status", checkPaymentStatus);

module.exports = {PaymentRouter};
