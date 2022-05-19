const nodemailer = require('nodemailer');
const Token = require("../models/tokenModel")
const OTP = require("../models/otpModel")
const {User} = require("../models/userModel");
const responseFunction = require("../core/validations/responseFunction")
//const validateForm = require("../core/middleware/validateForm")
const Subcription = require("../models/admin/subscription")
const Payment = require("../models/subscriptionPayment")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const responseMessage = require("../core/response/responseMessage")
const responseCode = require("../core/response/responseCode")

const userController = {
	//Function to register the user.
   
	signUp: async (req, res) => {
		try {
		    const { name, email, password } = req.body;
		
			 const user = await User.findOne({email: email});
			if (user) {
				return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, responseMessage.MESSAGE.ERROR.emailExist, responseCode.CODES.CLIENT_ERROR.valueAlreadyExist));
			}

            const hash = await bcrypt.hash(password, saltRounds);

			//Saving user.
			const newUser = new User({
				name, email, password: hash
			
			});

			await newUser.save();

            var transporter = nodemailer.createTransport({
			host: process.env.HOST_EMAIL_SMTP,
			port: process.env.PORT_EMAIL_SMTP,
			secure: true, 
			auth: {
				user: process.env.USER_EMAIL_SMTP,
				pass: process.env.PASSWORD_EMAIL_SMTP,
			}
	  });
	  
	  var mailOptions = {
		from: 'donot@trigma.in',
		to: email,
		subject: 'Link Verification',
		html: `<p>Click <a href="http://localhost:5000/api/getapprove/${newUser._id}">here</a> to approve your account</p>`
	  };
	  
	      const info = await transporter.sendMail(mailOptions)
		  if(!info){
			return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, responseMessage.MESSAGE.ERROR.somethingWrong, responseCode.CODES.SERVER_ERROR.internalServerError));
		  }
	
	
		  res.json(
			  responseFunction(responseMessage.MESSAGE.SUCCESS.errorBoolean, responseMessage.MESSAGE.SUCCESS.checkMail, responseCode.CODES.SUCCESS.created));

			// res.json({
			// 	message: jsonSuccess[0].checkMail,
			// 	error: jsonSuccess[0].errorBoolean,
			// 	responseCode: jsonSuccess[0].SuccessResponseCode,
			// 	data: {
			// 		...newUser._doc,
			// 		password: " ",
			// 	}	
			// });
		} catch (err) {
			//return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, responseMessage.MESSAGE.ERROR.somethingWrong, responseCode.SERVER_ERROR.internalServerError));

			return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, err.message, responseCode.CODES.SERVER_ERROR.internalServerError));
		}
	},


	approveAccount: async (req, res) => {
		try {
			const id_= req.params.id
			if(!id_){
				return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, responseMessage.MESSAGE.ERROR.idRequired, responseCode.CODES.CLIENT_ERROR.badRequest));
			}
			const updatestatus = await User.findOneAndUpdate({_id: id_}, {
				verified: true
			})

			res.json(
				responseFunction(responseMessage.MESSAGE.SUCCESS.errorBoolean, responseMessage.MESSAGE.SUCCESS.accountApprove, responseCode.CODES.SUCCESS.created));

			// res.json({
			// 	message: jsonSuccess[0].accountApprove,
			// 	error: jsonSuccess[0].errorBoolean,
			// 	responseCode: jsonSuccess[0].SuccessResponseCode
			// })
		} catch (err) {
			return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, err.message, responseCode.CODES.SERVER_ERROR.internalServerError));

			//return res.status(500).json({ message: err.message });
		}
	},
	
	//Function to login user.
	login: async (req, res) => {
		try {
			const { email, password, deviceToken } = req.body;
			console.log(deviceToken)

			//Finding user's email.
			const user = await User.findOne({ email });
			if (!user) {
				return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, responseMessage.MESSAGE.ERROR.noUser, responseCode.CODES.CLIENT_ERROR.notFound));
			}
			if(user.status === false){
				return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, responseMessage.MESSAGE.ERROR.accountNotApprove, responseCode.CODES.CLIENT_ERROR.unaouthorize));
			}
			var pass = await bcrypt.compare(password, user.password)
			if (!pass) {
				return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, responseMessage.MESSAGE.ERROR.incorrectPass, responseCode.CODES.CLIENT_ERROR.unaouthorize));
            } 
			//Creating access token.
			const accesstoken = createAccessToken({ id: user._id });
            if(accesstoken){
           const saveToken = new Token({
	                   userId: user._id,
	                   device_token: deviceToken,
	                   access_token: accesstoken
                     })
					 await saveToken.save();
             } 

			 res.json(
				responseFunction(responseMessage.MESSAGE.SUCCESS.errorBoolean, responseMessage.MESSAGE.SUCCESS.loginSuccess, responseCode.CODES.SUCCESS.accepted));


            // res.json({
			// 	message: jsonSuccess[0].loginSuccess,
			// 	error: jsonSuccess[0].errorBoolean,
			// 	responseCode: jsonSuccess[0].SuccessResponseCode,
			// 		accesstoken,
			// 		data: {
			// 			...user._doc,
			// 			password: " ",
			// 		}
			// });
		} catch (err) {
			return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, err.message, responseCode.CODES.SERVER_ERROR.internalServerError));

			//return res.status(500).json({ message: err.message });
		}
	},

	//Function to logout user.
	logout: async (req, res) => {
		try {
			var token_ = req.body.devicetoken
			const deletetoken = await Token.findOneAndRemove({device_token: token_})
			res.json(
				responseFunction(responseMessage.MESSAGE.SUCCESS.errorBoolean, responseMessage.MESSAGE.SUCCESS.loggedOutSuccessful, responseCode.CODES.SUCCESS.OK));
			// res.json({
			// 	message: jsonSuccess[0].logoutOutSuccess,
			// 	error: jsonSuccess[0].errorBoolean,
			// 	responseCode: jsonSuccess[0].SuccessResponseCode,
			// })
		} catch (err) {
			return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, err.message, responseCode.CODES.SERVER_ERROR.internalServerError));

			//return res.status(500).json({ message: err.message });
		}
	},

	forgotPassword: async (req, res) => {
		try {
			const getemail = req.body.email
			
			const doc = await User.findOne({email: getemail})
			if(!doc){
				return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, responseMessage.MESSAGE.ERROR.noUser, responseCode.CODES.CLIENT_ERROR.notFound));
			}
			    let otpCode = Math.floor(100000 + Math.random() * 900000);
				let otpData = new OTP({
					email:getemail,
					code:otpCode,
					expireIn: new Date().getTime()+300*1000
				})
				
				let otpResponse = await otpData.save();
		
				/**************E-mail OTP *********/
		
				var transporter = nodemailer.createTransport({
						host: process.env.HOST_EMAIL_SMTP,
						port: process.env.PORT_EMAIL_SMTP,
						secure: true, // secure:true for port 465, secure:false for port 587
						auth: {
							user: process.env.USER_EMAIL_SMTP,
							pass: process.env.PASSWORD_EMAIL_SMTP,
						}
				  });
				  
				  var mailOptions = {
					from: 'donot@trigma.in',
					to: getemail,
					subject: 'OTP Verification',
					text: 'Your one time verification code is: '+otpCode
				  };
				  
				  const info = await transporter.sendMail(mailOptions)
				  if(!info){
			       return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, responseMessage.MESSAGE.ERROR.somethingWrong, responseCode.CODES.SERVER_ERROR.internalServerError));
				}
				  res.json(
					responseFunction(responseMessage.MESSAGE.SUCCESS.errorBoolean, responseMessage.MESSAGE.SUCCESS.checkOTP, responseCode.CODES.SUCCESS.OK));
					// res.json({
					// 	message: jsonSuccess[0].checkOTP,
				    //     error: jsonSuccess[0].errorBoolean,
				    //     responseCode: jsonSuccess[0].SuccessResponseCode,
					// 	data: {
					// 		...doc._doc,
					// 		password: " ",
					// 	},
					// });

		} catch (err) {
			return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, err.message, responseCode.CODES.SERVER_ERROR.internalServerError));

			//return res.status(500).json({ message: err.message });
		}
	},

    verifyOTP: async (req, res) => {
		try {
			const otp = req.body.otpCode
			
			const doc = await OTP.findOne({email: req.body.email, code: otp})
			if(!doc){
				return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, responseMessage.MESSAGE.ERROR.otpInvalid, responseCode.CODES.CLIENT_ERROR.unauthorized));
			}
				let currentTime = new Date().getTime();
				let diff = doc.expireIn - currentTime;
				if(diff < 0){
             	return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, responseMessage.MESSAGE.ERROR.otpExpired, responseCode.CODES.CLIENT_ERROR.unauthorized));
				}	

				res.json(
					responseFunction(responseMessage.MESSAGE.SUCCESS.errorBoolean, responseMessage.MESSAGE.SUCCESS.otpVerified, responseCode.CODES.SUCCESS.OK));
				// res.json({
				// 	message: jsonSuccess[0].otpVerified,
				//     error: jsonSuccess[0].errorBoolean,
				// 	responseCode: jsonSuccess[0].SuccessResponseCode,

				// })
		} catch (err) {
			return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, err.message, responseCode.CODES.SERVER_ERROR.internalServerError));

			//return res.status(500).json({ message: err.message });
		}
	},
	resetPassword: async (req, res) => {
		try {
			const password = req.body.password
			const pass = await bcrypt.hash(password, 8);	
			let update = await User.findOneAndUpdate({email:req.body.email},{password: pass});
			if(!update){	
			return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, err.message, responseCode.CODES.SERVER_ERROR.internalServerError));
			}

			res.json(
				responseFunction(responseMessage.MESSAGE.SUCCESS.errorBoolean, responseMessage.MESSAGE.SUCCESS.passUpdated, responseCode.CODES.SUCCESS.OK));
		//    res.status(200).json({
		// 		message: jsonSuccess[0].passUpdated,
		// 		error: jsonSuccess[0].errorBoolean,
		// 		responseCode: jsonSuccess[0].SuccessResponseCode,
		// 	})

		} catch (err) {
			return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, err.message, responseCode.CODES.SERVER_ERROR.internalServerError));

			//return res.status(500).json({ message: err.message });
		}
	},


    //Function to get the user
	getUser: async (req, res) => {
		try {
			const user = await User.findById(req.user.id);
			if (!user) {
				return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, responseMessage.MESSAGE.ERROR.noUser, responseCode.CODES.CLIENT_ERROR.notFound));
			}

			res.json(
				responseFunction(responseMessage.MESSAGE.SUCCESS.errorBoolean, responseMessage.MESSAGE.SUCCESS.getUser, responseCode.CODES.SUCCESS.OK));


			// res.json(
			// 	{
			//     message: "User is fetched!",
			// 	error: jsonSuccess[0].errorBoolean,
			// 	responseCode: jsonSuccess[0].SuccessResponseCode,
			// 	data: user
			// 	}
			// );
		} catch (err) {
			return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, err.message, responseCode.CODES.SERVER_ERROR.internalServerError));

			//return res.status(500).json({ message: err.message });
		}
	},

    // subscriptionPayment: async (req,res) =>{
	// 	    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
	// 	    try {
	//         let planData = await Subcription.findOne({_id:req.body.planId});  
	// 	    let checkPayment = await Payment.findOne({userId: req.body.userId, paymentStatus:'SUCCESS'}).sort({_id:-1});
	// 	    let currentDate = new Date();
	// 	    let expiryDate = "";
	// 	    if(checkPayment){  
	// 		expiryDateOld = checkPayment.expiryDate;
	// 		if(currentDate.getTime() > expiryDateOld.getTime()){
	// 		   expiryDate = new Date(currentDate.setMonth(currentDate.getMonth()+planData.month));
	// 		}else{
	// 		   expiryDate = new Date(expiryDateOld.setMonth(expiryDateOld.getMonth()+planData.month));
	// 		}
	// 	    }else{  
	// 		  expiryDate = new Date(currentDate.setMonth(currentDate.getMonth()+planData.month));
	// 	    }
		  
	// 		stripe.customers
	// 		  .create({
	// 			name: req.body.name,
	// 			source: req.body.token
	// 		  })
	// 		  .then(customer =>
	// 			stripe.charges.create({
	// 			  amount: req.body.price,
	// 			  currency: "usd",
	// 			  customer: customer.id
	// 			})
	// 		  )          
	// 		  .then((response) => {     
	
	// 			var payment = new Payment();
	// 			payment.userId = req._id;
	// 			payment.transationId = response.id;
	// 			payment.cardHolderName = response.name;
	// 			payment.subscriptionId = req.body.planId;
	// 			payment.amountPaid = req.body.price;
	// 			payment.paymentStatus = req.body.paymentStatus || "SUCCESS";
	// 			payment.expiryDate = expiryDate;
	// 			payment.save((err,doc)=>{
	// 			  if(!err){                 
	// 				  res.status(200).json({statusText : "success",message:"Payment Successfull"})
	// 			  }else{
	// 				  err.errorname = "Something went worng. Please try again later!";
	// 				  return res.status(200).send(err.errorname);
	// 			  }
	// 			})            
	// 		  })
	// 		  .catch(err => res.status(200).json({statusText : "err",message:"Error making payment"}))
	// 	  } catch (err) {
	// 		return res.json(responseFunction(responseMessage.MESSAGE.ERROR.errorBoolean, err.message, responseCode.SERVER_ERROR.internalServerError));

	// 		//res.send(res.status(200).json({statusText : "err", message:"Error outside try"}));
	// 	}
	// },

	// checkSubscription: async (req, res) => {
	// 	console.log("00000000000000")
	// 	try {
	// 		const checkPayment = await Payment.findOne({ userId: req.user.id });
	// 		if(checkPayment){ 
	// 			return res.json({message: jsonError[0].noPayment, error: jsonError[0].errorBoolean, responseCode: jsonError[0].unauthorized});        
	// 		}
	// 		let currentDate = new Date();
	// 		expiryDateOld = checkPayment.expiryDate;
	// 		if(currentDate.getTime() > expiryDateOld.getTime()){
	// 			return res.json({message: jsonError[0].packExpired, error: jsonError[0].errorBoolean, responseCode: jsonError[0].unauthorized}); 
	// 		} 
	// 		res.json({
	// 			message: "Success",
	// 			error: jsonSuccess[0].errorBoolean, 
	// 			responseCode: jsonSuccess[0].SuccessResponseCode

	// 		})

	// 	} catch (err) {
	// 		return res.status(500).json({ msg: err.message });
	// 	}
	// }
	
}

//Function to to create access token.
const createAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports = userController;

