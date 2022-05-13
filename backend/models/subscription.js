const mongoose = require("mongoose");
//Model for user details.
const subscriptionSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		month: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);
//Exporting file and set collection name user.
module.exports = mongoose.model("subscriptions", subscriptionSchema);
