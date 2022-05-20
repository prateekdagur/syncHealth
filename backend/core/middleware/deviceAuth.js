const Token = require("../../models/tokenModel")
const {ERROR} = require("../response/responseMessage")
const responseCode = require("../response/responseCode")

const deviceAuth = async (req, res, next) => {
	try {
		const user = await Token.findOne({ userId: req.user.id });
		if (user.device_token != req.body.device_token) {
			return res.json(errorFunction(ERROR.errorBoolean, ERROR.accessDenied, "", responseCode.CODES.CLIENT_ERROR.unauthorized, []))

		}
		next();
	} catch (err) {
		return res.json(errorResponse(ERROR.errorBoolean, err.message, "",  responseCode.CODES.SERVER_ERROR.internalServerError, []));
		
	}
};

module.exports = deviceAuth;
