const express = require("express");
const {createVoucher, getAllVouchers, deleteVoucher, checkVoucherUsed, getVoucherById, updateVoucher} = require("../controllers/voucher.controller");

const voucherRouter = express.Router();

voucherRouter.get("/", getAllVouchers);
voucherRouter.post("/check-used", checkVoucherUsed);
voucherRouter.post("/", createVoucher);
voucherRouter.delete("/:id", deleteVoucher);
voucherRouter.get("/:id", getVoucherById);
voucherRouter.put("/:id", updateVoucher);

module.exports = {voucherRouter};
