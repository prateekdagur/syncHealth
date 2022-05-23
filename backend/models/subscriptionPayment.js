const mongoose = require("mongoose");
let Joi = require('joi')
//Model for user details.
const subscriptionPaymentSchema = new mongoose.Schema(
	{
		userId: {
			type: String
		},
		transationId: {
			type: String
		},
		subscriptionId: {
			type: String
		},
		amountPaid: {
			type: String
		},
		paymentStatus: {
			type: String
		},
		expiryDate: {
			type: Date
		},
		
	},
	{
		timestamps: true,
	},
);

const subscriptionPaymentJoiSchema = Joi.object().keys({
	planId : Joi.string().required(),
    userId: Joi.string().required(),
  })
//Exporting file and set collection name user.
module.exports = mongoose.model("subscriptionPayment", subscriptionPaymentSchema);
module.exports = subscriptionPaymentJoiSchema


