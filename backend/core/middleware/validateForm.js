//let createValidator = require('../validations/createValidator')
const errorResponse = require('../validations/errorResponse')
const responseCode = require("../response/responseCode")
const {ERROR} = require("../response/responseMessage")

let validateMiddleware = (schema) =>
  async (req, res, next) => {
    try{
      let payload = req.body
    const value = await schema.validate(payload, {abortEarly: false});

if(value.error){
  const array = (value.error.details || [])
 const validationMessages = array.map(er => er.message
   )
   
   return res.json(errorResponse(ERROR.errorBoolean,  validationMessages, "", responseCode.CODES.CLIENT_ERROR.badRequest, []))
} else {
  next()
}

    } catch (err){
      return res.json(errorResponse(ERROR.errorBoolean, err.message, "", responseCode.CODES.SERVER_ERROR.internalServerError, []));

    }
   
  
     
  }

module.exports = validateMiddleware