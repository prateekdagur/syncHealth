//let createValidator = require('../validations/createValidator')
const errorResponse = require('../utilities/response')
const responseCode = require("../utilities/statusCode")
const {ERROR} = require("../utilities/messages")

let validateRequest = (schema) =>
  async (req, res, next) => {
    try{
      let payload = req.body
      const requestValidated = await schema.validate(payload, {abortEarly: false});
      if(requestValidated.error){
        const array = (requestValidated.error.details || [])
        const validationMessages = array.map(er => er.message)
        errorResponse(ERROR.errorBoolean,  validationMessages, "", responseCode.CODES.CLIENT_ERROR.badRequest, [], res)
      } else {
        next()
      }
    } catch (err){
    errorResponse(ERROR.errorBoolean, err.message, "", responseCode.CODES.SERVER_ERROR.internalServerError, [], res);

    } 
  }

module.exports = validateRequest