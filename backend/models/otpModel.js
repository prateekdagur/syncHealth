const mongoose = require("mongoose");
//Model for user details.
const otpSchema = new mongoose.Schema(
	{
		email: {
			type: String,
		},
		code: {
			type: String,
		},
		expireIn: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);
//Exporting file and set collection name user.
module.exports = mongoose.model("Otp", otpSchema);


