const User = require("../models/userModel");
var nodemailer = require('nodemailer');
const Token = require("../models/tokenModel")
const OTP = require("../models/otpModel")
const Subcription = require("../models/subscription")
const Payment = require("../models/subscriptionPayment")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const jsonSuccess = require("../message/success.json")
const jsonError = require("../message/error.json")
const saltRounds = 10;

const userController = {
	//Function to register the user.
   
	signUp: async (req, res) => {
		try {
		    const { name, email, password } = req.body;
			const user = await User.findOne({ email });
			if(!name){
				return res.json({ message: jsonError[0].nameRequired, error: jsonError[0].errorBoolean, responseCode: jsonError[0].requiredErrorCode});
			}
			if(!email){
				return res.json({ message: jsonError[0].emailRequired, error: jsonError[0].errorBoolean, responseCode: jsonError[0].requiredErrorCode});
			}
			if(!password){
				return res.json({ message: jsonError[0].passRequired, error: jsonError[0].errorBoolean, responseCode: jsonError[0].requiredErrorCode});
			}
			if (user) {
				return res.json({message: jsonError[0].emailExist, error: jsonError[0].errorBoolean, responseCode: jsonError[0].valueExistCode});
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
			return res.status(400).json({message: jsonError[0].somethingWrong, error: jsonError[0].errorBoolean, responseCode: jsonError[0].somethingWrongCode});
		  }
	
			res.json({
				message: jsonSuccess[0].checkMail,
				error: jsonSuccess[0].errorBoolean,
				responseCode: jsonSuccess[0].SuccessResponseCode,
				data: {
					...newUser._doc,
					password: " ",
				}	
			});
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},


	approveAccount: async (req, res) => {
		try {
			const id_= req.params.id
			if(!id_){
				return res.json({ message: jsonError[0].idRequired, error: jsonError[0].errorBoolean, responseCode: jsonError[0].requiredErrorCode});
			}
			const updatestatus = await User.findOneAndUpdate({_id: id_}, {
				verified: true
			})
			res.json({
				message: jsonSuccess[0].accountApprove,
				error: jsonSuccess[0].errorBoolean,
				responseCode: jsonSuccess[0].SuccessResponseCode
			})
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},
	
	//Function to login user.
	login: async (req, res) => {
		try {
			const { email, password, deviceToken } = req.body;
			console.log(deviceToken)

			//Finding user's email.
			if(!email){
				return res.json({ message: jsonError[0].emailRequired, error: jsonError[0].errorBoolean, responseCode: jsonError[0].requiredErrorCode});
			}
			if(!password){
				return res.json({ message: jsonError[0].passRequired, error: jsonError[0].errorBoolean, responseCode: jsonError[0].requiredErrorCode});
			}
			if(!deviceToken){
				return res.json({ message: jsonError[0].deviceTokenRequired, error: jsonError[0].errorBoolean, responseCode: jsonError[0].requiredErrorCode});
			}
			const user = await User.findOne({ email });
			if (!user) {
				return res.json({ message: jsonError[0].noUser, error: jsonError[0].errorBoolean, responseCode: jsonError[0].notFoundCode});
			}
			if(user.status === false){
				return res.status(400).json({message: jsonError[0].emailNotApprove, error: jsonError[0].errorBoolean, responseCode: jsonError[0].unauthorized});
			}
			var pass = await bcrypt.compare(password, user.password)
			if (!pass) {
				return res.status(400).json({ message: jsonError[0].incorrectPass, error: jsonError[0].errorBoolean, responseCode: jsonError[0].unauthorized});
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
            res.json({
				message: jsonSuccess[0].loginSuccess,
				error: jsonSuccess[0].errorBoolean,
				responseCode: jsonSuccess[0].SuccessResponseCode,
					accesstoken,
					data: {
						...user._doc,
						password: " ",
					}
			});
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},

	//Function to logout user.
	logout: async (req, res) => {
		try {
			var token_ = req.params.devicetoken
			if(!token_){
				return res.json({ message: jsonError[0].tokenRequired, error: jsonError[0].errorBoolean, responseCode: jsonError[0].requiredErrorCode});
			}
			const deletetoken = await Token.findOneAndRemove({device_token: token_})
			res.json({
				message: jsonSuccess[0].logoutOutSuccess,
				error: jsonSuccess[0].errorBoolean,
				responseCode: jsonSuccess[0].SuccessResponseCode,
			})
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},

	forgotPassword: async (req, res) => {
		try {
			const getemail = req.body.email
			if(!getemail){
				return res.json({ message: jsonError[0].emailRequired, error: jsonError[0].errorBoolean, responseCode: jsonError[0].requiredErrorCode});
			}
			const doc = await User.findOne({email: getemail})
			if(!doc){
				return res.status(400).json({message: jsonError[0].emailNotExist, error: jsonError[0].errorBoolean, responseCode: jsonError[0].notFoundCode});
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
					return res.status(400).json({ message: jsonError[0].somethingWrong, error: jsonError[0].errorBoolean, responseCode: jsonError[0].somethingWrongCode});
				  }
				 
					res.json({
						message: jsonSuccess[0].checkOTP,
				        error: jsonSuccess[0].errorBoolean,
				        responseCode: jsonSuccess[0].SuccessResponseCode,
						data: {
							...doc._doc,
							password: " ",
						},
					});

		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},

    verifyOTP: async (req, res) => {
		try {
			const otp = req.body.otpCode
			if(!otp){
				return res.json({ message: jsonError[0].otpRequired, error: jsonError[0].errorBoolean, responseCode: jsonError[0].requiredErrorCode});
			}
			const doc = await OTP.findOne({email: req.body.email, code: otp})
			if(!doc){
				return res.json({ msg: jsonError[0].otpInvalid, error: jsonError[0].errorBoolean, responseCode: jsonError[0].unauthorized});
			}
				let currentTime = new Date().getTime();
				let diff = doc.expireIn - currentTime;
				if(diff < 0){
					return res.json({ message: jsonError[0].otpExpired, error: jsonError[0].errorBoolean, responseCode: jsonError[0].unauthorized});
				}	
				res.json({
					message: jsonSuccess[0].otpVerified,
				    error: jsonSuccess[0].errorBoolean,
					responseCode: jsonSuccess[0].SuccessResponseCode,

				})
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},
	resetPassword: async (req, res) => {
		try {
			const password = req.body.password
			if(!password){
				return res.json({ message: jsonError[0].passRequired, error: jsonError[0].errorBoolean, responseCode: jsonError[0].requiredErrorCode});
			}
			const pass = await bcrypt.hash(password, 8);	
			let update = await User.findOneAndUpdate({email:req.body.email},{password: pass});
			if(!update){	
				res.json({message: jsonError[0].somethingWrong, error: jsonError[0].errorBoolean, responseCode: jsonError[0].somethingWrongCode});
			}
		   res.status(200).json({
				message: jsonSuccess[0].passUpdated,
				error: jsonSuccess[0].errorBoolean,
				responseCode: jsonSuccess[0].SuccessResponseCode,
			})

		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},


    //Function to get the user
	getUser: async (req, res) => {
		try {
			const user = await User.findById(req.user.id);
			if (!user) {
				return res.status(400).json({ message: jsonError[0].noUser, error: jsonError[0].errorBoolean, responseCode: jsonError[0].notFoundCode });
			}
			res.json(
				{
			    message: "User is fetched!",
				error: jsonSuccess[0].errorBoolean,
				responseCode: jsonSuccess[0].SuccessResponseCode,
				data: user
				}
			);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	},

    subscriptionPayment: async (req,res) =>{
		    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
		    try {
	        let planData = await Subcription.findOne({_id:req.body.planId});  
		    let checkPayment = await Payment.findOne({userId: req.body.userId, paymentStatus:'SUCCESS'}).sort({_id:-1});
		    let currentDate = new Date();
		    let expiryDate = "";
		    if(checkPayment){  
			expiryDateOld = checkPayment.expiryDate;
			if(currentDate.getTime() > expiryDateOld.getTime()){
			   expiryDate = new Date(currentDate.setMonth(currentDate.getMonth()+planData.month));
			}else{
			   expiryDate = new Date(expiryDateOld.setMonth(expiryDateOld.getMonth()+planData.month));
			}
		    }else{  
			  expiryDate = new Date(currentDate.setMonth(currentDate.getMonth()+planData.month));
		    }
		  
			stripe.customers
			  .create({
				name: req.body.name,
				source: req.body.token
			  })
			  .then(customer =>
				stripe.charges.create({
				  amount: req.body.price,
				  currency: "usd",
				  customer: customer.id
				})
			  )          
			  .then((response) => {     
	
				var payment = new Payment();
				payment.userId = req._id;
				payment.transationId = response.id;
				payment.cardHolderName = response.name;
				payment.subscriptionId = req.body.planId;
				payment.amountPaid = req.body.price;
				payment.paymentStatus = req.body.paymentStatus || "SUCCESS";
				payment.expiryDate = expiryDate;
				payment.save((err,doc)=>{
				  if(!err){                 
					  res.status(200).json({statusText : "success",message:"Payment Successfull"})
				  }else{
					  err.errorname = "Something went worng. Please try again later!";
					  return res.status(200).send(err.errorname);
				  }
				})            
			  })
			  .catch(err => res.status(200).json({statusText : "err",message:"Error making payment"}))
		  } catch (err) {
			res.send(res.status(200).json({statusText : "err", message:"Error outside try"}));
		}
	},

	checkSubscription: async (req, res) => {
		console.log("00000000000000")
		try {
			const checkPayment = await Payment.findOne({ userId: req.user.id });
			if(checkPayment){ 
				return res.json({message: jsonError[0].noPayment, error: jsonError[0].errorBoolean, responseCode: jsonError[0].unauthorized});        
			}
			let currentDate = new Date();
			expiryDateOld = checkPayment.expiryDate;
			if(currentDate.getTime() > expiryDateOld.getTime()){
				return res.json({message: jsonError[0].packExpired, error: jsonError[0].errorBoolean, responseCode: jsonError[0].unauthorized}); 
			} 
			res.json({
				message: "Success",
				error: jsonSuccess[0].errorBoolean, 
				responseCode: jsonSuccess[0].SuccessResponseCode

			})

		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	}
	
}

//Function to to create access token.
const createAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports = userController;

