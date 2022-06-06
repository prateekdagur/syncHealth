const router = require("express").Router();
const adminAuth = require('../core/middleware/auth')
const deviceAuth = require('../core/middleware/deviceAuth')
const {getCategory} = require("../controllers/category");
router.get("/listing", getCategory);


module.exports = router;