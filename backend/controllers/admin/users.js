const {ERROR, SUCCESS} = require("../../core/utilities/messages")
const statusCode = require("../../core/utilities/statusCode")
const {User} = require("../../models/userModel");
const {errorResponse, successResponse} = require("../../core/utilities/response")
const config = require('config')
const dataEmpty = config.get('dataEmpty'); 
const emptyValidationsErrors = config.get('emptyValidationsErrors'); 

const getAllUser = async (req, res) => {
            try {
                const users = await User.find();
                if (!users) {
                     errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.noUser, statusCode.CODES.CLIENT_ERROR.notFound, dataEmpty, res)
                } else {
                    const data = users
                    successResponse(SUCCESS.errorBoolean, SUCCESS.getAllUser, statusCode.CODES.SUCCESS.created, data, res)
                   }
                } catch (err) {
                    errorResponse(ERROR.errorBoolean, emptyValidationsErrors, err.message, statusCode.CODES.SERVER_ERROR.internalServerError, dataEmpty, res);
                }
            }
            
const updateUserIsActive = async (req, res) => {
    try {
        const id = req.params.id
        const status = req.body.eventString
        const userUpdated = await User.findOneAndUpdate({_id: id}, {is_approved_by_admin: status});
        if (!userUpdated) {
            errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.noUser, statusCode.CODES.CLIENT_ERROR.notFound, dataEmpty, res)
            exit()} else{
            successResponse(SUCCESS.errorBoolean, SUCCESS.userUpdated, statusCode.CODES.SUCCESS.created, dataEmpty, res);
               }	
            } catch (err) {
            errorResponse(ERROR.errorBoolean, emptyValidationsErrors, err.message, statusCode.CODES.SERVER_ERROR.internalServerError, dataEmpty, res);
        }
}

module.exports = {getAllUser, updateUserIsActive};
