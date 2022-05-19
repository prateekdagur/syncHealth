const jwt = require("jsonwebtoken");

 const auth = (req, res, next) => {
	try {
		console.log(req.headers['authorization'], "auth>>>>>>>>>>>>>>>")
		const token = req.headers['authorization'];
		if (!token) {
			return res.status(400).json({ msg: "Invalid Authentication1" });
		}
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) {
		 		return res.status(400).json({ msg: "Invalid authentication2" });
			}
		    req.user = user;
			next();
		});
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = auth;

