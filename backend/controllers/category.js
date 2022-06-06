"use strict";
const config = require('config')
const {errorResponse, successResponse} = require("../core/utilities/response")
const {Category} = require("../models/admin/categoryModel")
const {ERROR, SUCCESS} = require("../core/utilities/messages")
const statusCode = require("../core/utilities/statusCode");
const dataEmpty = config.get('dataEmpty'); 
const emptyValidationsErrors = config.get('emptyValidationsErrors'); 

const getCategory = async (req, res) => {
    try {
        const category = await Category.find();
        if (!category) {
             errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.noCategory, statusCode.CODES.CLIENT_ERROR.notFound, dataEmpty, res)
        }
        const data = category
             
            successResponse(SUCCESS.errorBoolean, SUCCESS.categoryFetched, statusCode.CODES.SUCCESS.created, data, res)
            } catch (err) {
            errorResponse(ERROR.errorBoolean, emptyValidationsErrors, err.message, statusCode.CODES.SERVER_ERROR.internalServerError, dataEmpty, res);
        }
    }


module.exports = {getCategory};
