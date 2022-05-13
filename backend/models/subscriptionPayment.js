const mongoose = require("mongoose");
//Model for user details.
const subscriptionPaymentSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		transationId: {
			type: String,
		},
		subscriptionId: {
			type: String,	
		},
		amountPaid: {
			type: String,	
		},
		paymentStatus: {
			type: String,
			required: true,
		},
		expiryDate: {
			type: Date
		},
		
	},
	{
		timestamps: true,
	},
);
//Exporting file and set collection name user.
module.exports = mongoose.model("subscriptionPayment", subscriptionPaymentSchema);


