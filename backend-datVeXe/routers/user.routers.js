const express = require("express");
const {User} = require("../models");
const {register, login, uploadAvatar, resetPassword, getAllTrip, getAllUser, getDetailUser, updateUser, deleteUser, updateUserBooking, getUserInfo, checkEmailUser, sendOtpEmail, changePass} = require("../controllers/user.controllers");
const {checkExist} = require("../middlewares/validations/checkExist");
const {uploadImage} = require("../middlewares/upload/uploadImages");
const {authenticate} = require("../middlewares/auth/authenticate");
const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.put("/change/:id", changePass);

userRouter.get("/me", authenticate, getUserInfo);
userRouter.post("/checkmail", checkEmailUser);
userRouter.post("/otp", sendOtpEmail);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/get", getAllUser);
userRouter.get("/getdetail/:id", getDetailUser);
userRouter.put("/update/:id", updateUser);
userRouter.put("/updatebooking/:id", updateUserBooking);

userRouter.delete("/delete/:id", deleteUser);

//upload file

// userRouter.post("/upload", authenticate, uploadImage("avatar"), uploadAvatar);
userRouter.get("/all-trip", getAllTrip);
module.exports = {
	userRouter,
};
