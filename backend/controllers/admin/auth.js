"use strict";
//const moment = require('moment'); // require
const Token = require("../../models/tokenModel");
//const {sendEmail} = require('../core/utilities/emailService');
//const {Otp} = require("../models/otpModel");
const {User} = require("../../models/userModel");
// const {Email} = require("../models/emailsModel");
const config = require('config')
const {errorResponse, successResponse} = require("../../core/utilities/response")
//const validateForm = require("../core/middleware/validateForm")
// const Subcription = require("../models/admin/subscription")
// const Payment = require("../models/subscriptionPayment")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
//const saltRounds = 10;
const {ERROR, SUCCESS} = require("../../core/utilities/messages")
const statusCode = require("../../core/utilities/statusCode");
//const { use } = require('../routes/userRoutes');
//const userController = {
	//Function to register the user.
	const dataEmpty = config.get('dataEmpty'); 
	const emptyValidationsErrors = config.get('emptyValidationsErrors'); 
	//const fromMail = config.get('fromMail');
	// const signUpLinkSubject = config.get('linkSubject'); 
	// const approveAccountUrl = config.get('approveAccountUrl'); 
	
	//Function to login user.
	const login = async (req, res) => {
		try {
			const { email, password} = req.body;
            console.log("email>>>>>>", email)
            //Finding user's email.
			const user = await User.findOne({ email });
			if (!user) {
				return errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.noUser, statusCode.CODES.CLIENT_ERROR.notFound, dataEmpty, res);
			}
            if(user.is_verified === false){
			    return errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.accountNotApprove, statusCode.CODES.CLIENT_ERROR.unauthorized, dataEmpty, res);
			}
			const pass = await bcrypt.compare(password, user.password)
			if (!pass) {
				return errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.incorrectPass, statusCode.CODES.CLIENT_ERROR.unauthorized, dataEmpty, res);
            } else {
                //Creating access token.
                const accesstoken = createAccessToken({ id: user._id });
                if(accesstoken){
                const data = [{
                ...user._doc,
                    password: "",
                    accesstoken: accesstoken
                }
            ]
      
        console.log("dddddddddd", data)
        successResponse(SUCCESS.errorBoolean, SUCCESS.loginSuccess, statusCode.CODES.SUCCESS.accepted, data, res);
        }
     }
			
         } catch (err) {
			  errorResponse(ERROR.errorBoolean, emptyValidationsErrors, err.message, statusCode.CODES.SERVER_ERROR.internalServerError, dataEmpty, res);
		  }
		}

	//Function to logout user.
	const logout = async (req, res) => {
		try {
			const deletetoken = await Token.findOneAndRemove({})
			if(!deletetoken){
				errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.noUser, statusCode.CODES.CLIENT_ERROR.notFound, dataEmpty, res);
			}
		        successResponse(SUCCESS.errorBoolean, SUCCESS.loggedOutSuccessful, statusCode.CODES.SUCCESS.OK, dataEmpty, res);
			
			} catch (err) {
				errorResponse(ERROR.errorBoolean, emptyValidationsErrors, err.message, statusCode.CODES.SERVER_ERROR.internalServerError, dataEmpty, res);
			}
		}
	
//Function to to create access token.
const createAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

module.exports = {login, logout};

