const router = require("express").Router();
const adminController = require("../../controllers/admin/adminController");
const validateMiddleware = require('../../core/middleware/validateRequest')
const subscriptionJoiSchema = require('../../models/admin/subscription')
router.post("/createSubscription", validateMiddleware(subscriptionJoiSchema), adminController.createAdminSubscription);
module.exports = router;