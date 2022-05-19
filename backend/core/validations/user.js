// const Joi = require("joi")
// const errorFunction = require("./responseFunction");
// //const {validate} = require("express-validator")
// const validation = Joi.object({
//             name: Joi.string().required().label("name must be there"),
//             email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
//             password: Joi.string().required() 
// });
   
// const userValidation = async (req, res, next) => {
// 	const payload = {
// 		name: req.body.name,
// 		email: req.body.email,
// 		password: req.body.password,
// 	};

// 	const { error } = validation.validate(payload);



//     if (error) {
// 		res.status(406);
// 		return res.json(
// 			errorFunction(true, `Error in User Data : ${error.message}`, 500)
// 		);
// 	} else {
// 		next();
// 	}
// };
// module.exports = userValidation;