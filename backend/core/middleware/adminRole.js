
const {User} = require("../../models/userModel")
const {ERROR} = require("../utilities/messages")
const {errorResponse} = require("../utilities/response")
const responseCode = require("../utilities/statusCode")
const adminRole = async (req, res, next) => {
	try {
       const userDetails = await User.findOne({_id: req.user.id})
				.populate({path: "role_id", select: 'user_role'});
          console.log("userdetails>>>>>>>>>>>>>>>",userDetails.role_id.user_role)
		if (userDetails.role_id.user_role != "ADMIN") {
            console.log("Roleauth>>>>>>>>>>>>>>>")
			errorResponse(ERROR.errorBoolean, ERROR.adminAccessDenied, "", responseCode.CODES.CLIENT_ERROR.unauthorized, [], res)
			//return res.status(400).json({ msg: "Admin access denied" });
        } else {
            next();
          }
	} catch (err) {
        console.log("eeeeeerrrrrrrrrreeeeeeeeee>>>>>>>",err)
        errorResponse(ERROR.errorBoolean, err.message, "",  responseCode.CODES.SERVER_ERROR.internalServerError, [], res);	

	}
};

module.exports = adminRole;