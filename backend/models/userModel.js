const mongoose = require("mongoose");
let Joi = require('joi')
//Model for user details.
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		verified:{
          type: Boolean,
		  default: false
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
    name: Joi.string().required(),
    email: Joi.string().email().required(),
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



