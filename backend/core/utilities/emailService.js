const nodemailer = require('nodemailer');
const config = require('config')
const fromEmail = config.get('fromMail');
const {errorResponse, successResponse} = require("../utilities/response")
const hostEmailSmpt = config.get('hostEmailSmpt');
const portEmailSmpt = config.get('portEmailSmtp');
const userEmailSmpt = config.get('userEmailSmpt');
const passwordEmailSmpt = config.get('passwordEmailSmpt');
const  transporter =  nodemailer.createTransport({
    host: hostEmailSmpt,
    port: portEmailSmpt,
    secure: true,
    auth: {
        user: userEmailSmpt,
        pass: passwordEmailSmpt,
    }
 });
const sendEmail = async (mailOptions, res) => { 
        console.log({mailOptions, from: fromEmail}, "333333333333333>>>>>>>>>>>>>>>>.")
         const info =  await transporter.sendMail({             
             from:config.get('fromMail'),
             to:mailOptions.to,
             subject:mailOptions.subject,
             html:mailOptions.html
            })
            if(!info){
            errorResponse(ERROR.errorBoolean, emptyValidationsErrors, ERROR.somethingWrong, responseCode.CODES.SERVER_ERROR.internalServerError, dataEmpty,res)
            }
            successResponse(SUCCESS.errorBoolean, SUCCESS.checkMail, responseCode.CODES.SUCCESS.created, dataEmpty, res)

}
   
module.exports.sendEmail = sendEmail;
