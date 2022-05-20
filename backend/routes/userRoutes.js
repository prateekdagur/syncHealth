const router = require("express").Router();
//const {validate} = require("express-validator")
const adminAuth = require('../core/middleware/auth')
const deviceAuth = require('../core/middleware/deviceAuth')
const validateMiddleware = require('../core/middleware/validateForm')
//const userJoiSchema = require('../models/userModel')
const {userJoiSchema, userLoginJoiSchema, userLogoutJoiSchema, userForgotPasswordJoiSchema, resetPasswordJoiSchema} = require('../models/userModel')
// const userLogoutJoiSchema = require('../models/userModel')
// const userForgotPasswordJoiSchema = require('../models/userModel')
// const resetPasswordJoiSchema = require('../models/userModel')
const {otpJoiSchema} = require('../models/otpModel')
//const subscriptionPaymentJoiSchema = require('../models/subscriptionPayment')
 const {signUp, login, logout, forgotPassword, approveAccount, verifyOTP, resetPassword, getUser} = require("../controllers/userController");
router.post("/signup", validateMiddleware(userJoiSchema), signUp);
router.post("/login", validateMiddleware(userLoginJoiSchema), login);
router.post("/logout", validateMiddleware(userLogoutJoiSchema), logout);
router.post("/forgotpassword", validateMiddleware(userForgotPasswordJoiSchema), forgotPassword);
router.post("/verifyotp", validateMiddleware(otpJoiSchema), verifyOTP);
router.post("/changepassword", validateMiddleware(resetPasswordJoiSchema), resetPassword);
router.get("/getapprove/:id", approveAccount);
router.get("/getuser", adminAuth, deviceAuth, getUser);
//router.get("/subscriptionPayment", validateMiddleware(subscriptionPaymentJoiSchema), userController.subscriptionPayment);
// router.get("/checkSubscription", userController.checkSubscription);

module.exports = router;