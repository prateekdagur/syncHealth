const Token = require("../models/tokenModel")

const deviceAuth = async (req, res, next) => {
    console.log("00000000000000")
	try {
		const user = await Token.findOne({ userId: req.user.id });
        console.log(user.device_token, "ddddddddddddd")
		if (user.device_token != req.body.deviceToken) {
            console.log("cccccccccccc")
			return res.status(400).json({ msg: "Access denied" });
		}
        console.log("ffffffffffff")
		next();
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = deviceAuth;
