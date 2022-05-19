const router = require("express").Router();
const adminAuth = require('../core/middleware/auth')
const deviceAuth = require('../core/middleware/deviceAuth')

const paymentController = require("../controllers/paymentController");
router.post("/subscriptionPayment", adminAuth, deviceAuth, paymentController.subscriptionPayment);
//router.post("/freeSubscription", adminAuth, deviceAuth, paymentController.freeSubscription);
router.post("/checkSubscription", adminAuth, deviceAuth, paymentController.checkSubscription);

module.exports = router;