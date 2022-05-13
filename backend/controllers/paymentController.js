const User = require("../models/userModel");
const Token = require("../models/tokenModel")
const OTP = require("../models/otpModel")
const Subcription = require("../models/subscription")
const Payment = require("../models/subscriptionPayment")
const jsonSuccess = require("../message/success.json")
const jsonError = require("../message/error.json")

const paymentController = {
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
   freeSubscription: async (req,res) =>{
        try {  
        let currentDate = new Date();
         expiryDate = new Date(currentDate.setMonth(currentDate.getMonth()+ 01));
           const payment = new Payment({
            userId: req._id,
            paymentStatus: req.body.paymentStatus || "SUCCESS",
            expiryDate: expiryDate
           });
           await payment.save();
          
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

module.exports = paymentController;