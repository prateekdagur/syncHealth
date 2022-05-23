const mongoose = require("mongoose");
let Joi = require('joi')
//Model for user details.
const userSchema = new mongoose.Schema(
	{
		first_name: {
			type: String	
		},
		last_name: {
			type: String
		},
		age: {
			type: Number
		},
		// dob: {
		// 	type: String
		// },
		email: {
			type: String
		},
		password: {
			type: String
		},
		is_verified:{
         	type: Boolean,
		    default: false
		},
		is_approved_by_admin:{
		  type: Boolean,
		  default: true
		}
		// modifiedate: {
		// 	type: Date,
		// }

	},
	{
		timestamps: true,
	},
);

const userJoiSchema = Joi.object().keys({
    first_name: Joi.string().max(10).required(),
    last_name: Joi.string().max(10).required(),
    age: Joi.number().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required()
  })

  const userLoginJoiSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    device_token: Joi.string().required(),

  })

  const resetPasswordJoiSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()

  })

  const userLogoutJoiSchema = Joi.object().keys({
    
    device_token: Joi.string().required(),

  })

  const userForgotPasswordJoiSchema = Joi.object().keys({
    email: Joi.string().email().required(),
  })

//Exporting file and set collection name user.
const User = mongoose.model("User", userSchema);
module.exports = {User, userJoiSchema, userLoginJoiSchema, userLogoutJoiSchema, userForgotPasswordJoiSchema, resetPasswordJoiSchema}



