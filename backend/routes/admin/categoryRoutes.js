const router = require("express").Router();
const adminAuth = require('../../core/middleware/auth')
const deviceAuth = require('../../core/middleware/deviceAuth')
const validateRequest = require('../../core/middleware/validateRequest')
const {categoryJoiSchema} = require('../../models/admin/categoryModel')
const {createCategory, getCategory} = require("../../controllers/admin/categoryController");
router.post("/add", validateRequest(categoryJoiSchema), createCategory);
router.get("/listing", getCategory);

module.exports = router;
