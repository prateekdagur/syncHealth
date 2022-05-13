const mongoose = require("mongoose");
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
	},
	{
		timestamps: true,
	},
);
//Exporting file and set collection name user.
module.exports = mongoose.model("User", userSchema);


