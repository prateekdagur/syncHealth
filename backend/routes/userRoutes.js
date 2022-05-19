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
const otpJoiSchema = require('../models/otpModel')
//const subscriptionPaymentJoiSchema = require('../models/subscriptionPayment')
 const userController = require("../controllers/userController");
router.post("/signup", validateMiddleware(userJoiSchema), userController.signUp);
router.post("/login", validateMiddleware(userLoginJoiSchema), userController.login);
router.post("/logout", validateMiddleware(userLogoutJoiSchema), userController.logout);
router.post("/forgotpassword", validateMiddleware(userForgotPasswordJoiSchema), userController.forgotPassword);
router.post("/verifyotp", validateMiddleware(otpJoiSchema), userController.verifyOTP);
router.post("/changepassword", validateMiddleware(resetPasswordJoiSchema), userController.resetPassword);
router.get("/getapprove/:id", userController.approveAccount);
router.get("/getuser", adminAuth, deviceAuth, userController.getUser);
//router.get("/subscriptionPayment", validateMiddleware(subscriptionPaymentJoiSchema), userController.subscriptionPayment);
// router.get("/checkSubscription", userController.checkSubscription);

module.exports = router;