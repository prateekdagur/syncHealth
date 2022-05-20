"use strict";
const nodemailer = require('nodemailer');
const Token = require("../models/tokenModel");
const {Otp} = require("../models/otpModel");
const {User} = require("../models/userModel");
const config = require('config')
const successResponse = require("../core/validations/successResponse")
const errorResponse = require("../core/validations/errorResponse")
//const validateForm = require("../core/middleware/validateForm")
const Subcription = require("../models/admin/subscription")
const Payment = require("../models/subscriptionPayment")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {ERROR, SUCCESS} = require("../core/response/responseMessage")
const responseCode = require("../core/response/responseCode");
//const { use } = require('../routes/userRoutes');
//const userController = {
	//Function to register the user.
	const dataEmpty = config.get('dataEmpty'); 
	const emptyValidationsErrors = config.get('emptyValidationsErrors'); 

	
	const signUp = async (req, res) => {
		try {
		    const { name, email, password } = req.body;
			const db_email = config.get('fromMail');
			const db_linkSubject = config.get('linkSubject'); 
			const db_approveAccountUrl = config.get('approveAccountUrl'); 

			 const user = await User.findOne({email: email});
			if (user) {
				return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.emailExist, responseCode.CODES.CLIENT_ERROR.valueAlreadyExist, dataEmpty));
			}

            const hash = await bcrypt.hash(password, saltRounds);

			//Saving user.
			const newUser = new User({
				name, email, password: hash
			
			});

			await newUser.save();

           const  transporter = nodemailer.createTransport({
			host: process.env.HOST_EMAIL_SMTP,
			port: process.env.PORT_EMAIL_SMTP,
			secure: true, 
			auth: {
				user: process.env.USER_EMAIL_SMTP,
				pass: process.env.PASSWORD_EMAIL_SMTP,
			}
	  });
	
	  const mailOptions = {
	    from: db_email,
		to: email,
		subject: db_linkSubject,
		html: `<p>Click <a href="${db_approveAccountUrl}/${newUser._id}">here</a> to approve your account</p>`
	  };
	  
	      const info = await transporter.sendMail(mailOptions)
		  if(!info){
			return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.somethingWrong, responseCode.CODES.SERVER_ERROR.internalServerError, dataEmpty));
		  }

		  res.json(
			successResponse(SUCCESS.errorBoolean, SUCCESS.checkMail, responseCode.CODES.SUCCESS.created, dataEmpty));
		} catch (err) {
			return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, err.message, responseCode.CODES.SERVER_ERROR.internalServerError, dataEmpty));
		}
	}


	const approveAccount = async (req, res) => {
		try {
			const id_= req.params.id
			if(!id_){
				return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.idRequired, responseCode.CODES.CLIENT_ERROR.badRequest, dataEmpty));
			}
			const updatestatus = await User.findOneAndUpdate({_id: id_}, {
				verified: true
			})

			res.json(
				successResponse(SUCCESS.errorBoolean, SUCCESS.accountApprove, responseCode.CODES.SUCCESS.created));
		} catch (err) {
			return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, err.message, responseCode.CODES.SERVER_ERROR.internalServerError, dataEmpty));
            //return res.status(500).json({ message: err.message });
		}
	}
	
	//Function to login user.
	const login = async (req, res) => {
		try {
			const { email, password, device_token } = req.body;
			console.log(device_token)

			//Finding user's email.
			const user = await User.findOne({ email });
			if (!user) {
				return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.noUser, responseCode.CODES.CLIENT_ERROR.notFound, dataEmpty));
			}
			if(user.status === false){
				return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.accountNotApprove, responseCode.CODES.CLIENT_ERROR.unauthorized, dataEmpty));
			}
			const pass = await bcrypt.compare(password, user.password)
			if (!pass) {
				return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.incorrectPass, responseCode.CODES.CLIENT_ERROR.unauthorized, dataEmpty));
            } 
			//Creating access token.
			const accesstoken = createAccessToken({ id: user._id });
            if(accesstoken){
           const saveToken = new Token({
	                   userId: user._id,
	                   device_token: device_token,
	                   access_token: accesstoken
                     })
					 await saveToken.save();
             } 

			 res.json(
				successResponse(SUCCESS.errorBoolean, SUCCESS.loginSuccess, responseCode.CODES.SUCCESS.accepted));
		} catch (err) {
			return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, err.message, responseCode.CODES.SERVER_ERROR.internalServerError, dataEmpty));
		}
	}

	//Function to logout user.
	const logout = async (req, res) => {
		try {
			const token_ = req.body.device_token
			const deletetoken = await Token.findOneAndRemove({device_token: token_})
			if(!deletetoken){
				return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.noUser, responseCode.CODES.CLIENT_ERROR.notFound, dataEmpty));
			}
			res.json(
				successResponse(SUCCESS.errorBoolean, SUCCESS.loggedOutSuccessful, responseCode.CODES.SUCCESS.OK));
			
		} catch (err) {
			return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, err.message, responseCode.CODES.SERVER_ERROR.internalServerError, dataEmpty));
		}
	}

	const forgotPassword = async (req, res) => {
		try {
			const getemail = req.body.email
			
			const doc = await User.findOne({email: getemail})
			if(!doc){
				return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.noUser, responseCode.CODES.CLIENT_ERROR.notFound, dataEmpty));
			}
			    const otpCode = Math.floor(100000 + Math.random() * 900000);
				let date = new Date().getTime()+300*1000
				
				const otpData = new Otp({
					email:getemail,
					code:otpCode,
					expireIn: date
				});
			           await otpData.save();
			
				/**************E-mail OTP *********/
		
				const transporter = nodemailer.createTransport({
						host: process.env.HOST_EMAIL_SMTP,
						port: process.env.PORT_EMAIL_SMTP,
						secure: true, // secure:true for port 465, secure:false for port 587
						auth: {
							user: process.env.USER_EMAIL_SMTP,
							pass: process.env.PASSWORD_EMAIL_SMTP,
						}
				  });
				  
				  const mailOptions = {
					from: fromMail,
					to: getemail,
					subject: 'OTP Verification',
					text: 'Your one time verification code is: '+otpCode
				  };
				  
				  const info = await transporter.sendMail(mailOptions)
				  if(!info){
			       return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.somethingWrong, responseCode.CODES.SERVER_ERROR.internalServerError, dataEmpty));
				}
				  res.json(
					successResponse(SUCCESS.errorBoolean, SUCCESS.checkOTP, responseCode.CODES.SUCCESS.OK));
		} catch (err) {
			return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, err.message, responseCode.CODES.SERVER_ERROR.internalServerError, dataEmpty));

			//return res.status(500).json({ message: err.message });
		}
	}

    const verifyOTP = async (req, res) => {
		try {
			const otp = req.body.otpCode
			
			const doc = await Otp.findOne({email: req.body.email, code: otp})
			if(!doc){
				return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.otpInvalid, responseCode.CODES.CLIENT_ERROR.unauthorized, dataEmpty));
			}
				let currentTime = new Date().getTime();
				let diff = doc.expireIn - currentTime;
				if(diff < 0){
             	return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.otpExpired, responseCode.CODES.CLIENT_ERROR.unauthorized, dataEmpty));
				}	

				res.json(
					successResponse(SUCCESS.errorBoolean, SUCCESS.otpVerified, responseCode.CODES.SUCCESS.OK));
		} catch (err) {
			return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, err.message, responseCode.CODES.SERVER_ERROR.internalServerError, dataEmpty));
		}
	}
	const resetPassword = async (req, res) => {
		try {
			const password = req.body.password
			const pass = await bcrypt.hash(password, 10);	
			let update = await User.findOneAndUpdate({email:req.body.email},{password: pass});
			if(!update){	
			return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, err.message, responseCode.CODES.SERVER_ERROR.internalServerError, dataEmpty));
			}
            res.json(
				successResponse(SUCCESS.errorBoolean, SUCCESS.passUpdated, responseCode.CODES.SUCCESS.OK));
		} catch (err) {
			return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, err.message, responseCode.CODES.SERVER_ERROR.internalServerError, dataEmpty));
		}
	}


    //Function to get the user
	const getUser = async (req, res) => {
		try {
			const user = await User.findById(req.user.id);
			if (!user) {
				return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.noUser, responseCode.CODES.CLIENT_ERROR.notFound, dataEmpty));
			}
           const  data = {
				...user._doc,
				password: ""
			}
			res.json(
				successResponse(SUCCESS.errorBoolean, SUCCESS.getUser, responseCode.CODES.SUCCESS.OK, data));

		} catch (err) {
			return res.json(errorResponse(ERROR.errorBoolean, emptyValidationsErrors, err.message, responseCode.CODES.SERVER_ERROR.internalServerError, dataEmpty));
		}
	}

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
	
//}

//Function to to create access token.
const createAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports = {signUp, login, logout, approveAccount, forgotPassword, verifyOTP, resetPassword, getUser};

