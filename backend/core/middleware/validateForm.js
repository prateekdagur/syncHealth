//let createValidator = require('../validations/createValidator')
let responseFunction = require('../validations/responseFunction')
const responseCode = require("../response/responseCode")

let validateMiddleware = (schema) =>
  async (req, res, next) => {
    try{
      let payload = req.body
      // let validate = createValidator(schema)
  console.log(payload, schema)
      // proceed next if validated otherwise catch error and pass onto express error handler
    const value = await schema.validate(payload);
        if(value.error){
        console.log(value.error.details, "eeeeeeee")
              //return res.json(true, value.error.details[0].message, 500)
              return res.json(responseFunction(true, value.error.details[0].message, responseCode.CODES.CLIENT_ERROR.badRequest))
        } else {
          next()
        }
      // validate(payload)
      //   .then(validated => {
      //     req.body = validated
      //     next()
      //   })
    } catch (err){
			return res.status(500).json({ message: err.message });
    }
   
  
     
  }

module.exports = validateMiddleware