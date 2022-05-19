const Subcription = require("../../models/admin/subscription")
const responseMessage = require("../../core/response/responseMessage")
const responseCode = require("../../core/response/responseCode")
const responseFunction = require("../../core/validations/responseFunction")


const adminController = {
	createAdminSubscription: async (req, res) => {
		try {
			const { title, month, price} = req.body;

			const Subs = await Subcription.findOne({ title: title });
			if (Subs) {
				return res.json({is_error: false, message: responseMessage.MESSAGE.ERROR.subscriptionAlreadyExist, responseCode: responseCode.CODES.CLIENT_ERROR.valueAlreadyExist});
			}
			//Saving user.
			const new_subs = await Subcription.create({
				title,
				month,
				price,
			});

			await new_subs.save();

			res.json(
				responseFunction(false, responseMessage.MESSAGE.SUCCESS.subscriptionCreated, responseCode.CODES.SUCCESS.CREATED));  
			// res.json({
			// 	msg: "Subscription is added successfully",
			// 	practice: {
			// 		new_subs,
			// 	},
			// });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
}
module.exports = adminController;
