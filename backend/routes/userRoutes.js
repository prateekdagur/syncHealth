const router = require("express").Router();
const adminAuth = require('../middleware/auth')
const deviceAuth = require('../middleware/deviceAuth')

 const userController = require("../controllers/userController");
router.post("/signup", userController.signUp);
router.post("/login", userController.login);
router.post("/logout/:token", userController.logout);
router.post("/forgotpassword", userController.forgotPassword);
router.post("/verifyotp", userController.verifyOTP);
router.post("/changepassword", userController.resetPassword);
router.get("/getapprove/:id", userController.approveAccount);
router.get("/getuser", adminAuth, deviceAuth, userController.getUser);
router.get("/subscriptionPayment", userController.subscriptionPayment);
router.get("/checkSubscription", userController.checkSubscription);

module.exports = router;