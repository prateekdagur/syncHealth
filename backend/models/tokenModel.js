const mongoose = require("mongoose");
//Model for user details.
const tokenSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		device_token: {
			type: String,
			required: true,
		},
		access_token: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

//Exporting file and set collection name user.
module.exports = mongoose.model("Tokens", tokenSchema);

