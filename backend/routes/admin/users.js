const router = require("express").Router();
const adminAuth = require('../../core/middleware/auth')
//const deviceAuth = require('../../core/middleware/deviceAuth')
const {getAllUser, updateUserIsActive} = require("../../controllers/admin/users");
const adminRole = require("../../core/middleware/adminRole");

router.get("/listing", getAllUser);
router.put("/update/:id", updateUserIsActive);

module.exports = router;