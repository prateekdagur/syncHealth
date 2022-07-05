const router = require("express").Router();
const adminAuth = require('../../core/middleware/auth')
//const deviceAuth = require('../../core/middleware/deviceAuth')
const adminRole = require('../../core/middleware/adminRole')
const validateRequest = require('../../core/middleware/validateRequest')
const {adminLoginJoiSchema} = require('../../models/userModel')

const {login} = require("../../controllers/admin/auth");

router.post("/login", validateRequest(adminLoginJoiSchema), login);
module.exports = router;