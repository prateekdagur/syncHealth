const jwt = require("jsonwebtoken");
const {ERROR} = require("../response/responseMessage")
const responseCode = require("../response/responseCode")
const dataEmpty = []

 const auth = (req, res, next) => {
	try {
		const token = req.headers['authorization'];
		if (!token) {
			return res.json(errorFunction(ERROR.errorBoolean, ERROR.invalidAuth, responseCode.CODES.CLIENT_ERROR.unauthorized, emptyData))
		}
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) {
				return res.json(errorFunction(ERROR.errorBoolean, ERROR.invalidAuth, responseCode.CODES.CLIENT_ERROR.unauthorized, emptyData))
			}
		    req.user = user;
			next();
		});
	} catch (err) {
		return res.json(errorResponse(ERROR.errorBoolean, err.message, responseCode.CODES.SERVER_ERROR.internalServerError, dataEmpty));
	}
};

module.exports = auth;

