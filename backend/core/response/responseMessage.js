const ERROR = {
    errorBoolean: true,
    emailExist:  "This user is already exists.",
    emailNotExist: "This email does not exist.",
    somethingWrong: "Something Went Wrong. Please try again!",
    noUser: "User does not exist",
    emailNotApprove: "Your email is not approved",
    accountNotApprove: "Your account is not approved",
    incorrectPass:   "Incorrect Password",
    invalidAuth: "Invalid Authentication",
    otpInvalid: "Invalid OTP",
    otpExpired: "OTP expired.",
    idRequired: "ID is required",
    accessDenied: "Access Denied",
    deviceTokenRequired: "Device Token  is required",
    tokenRequired: "Token is required",
    otpRequired: "OTP is required",
    noPayment: "You do not have any subscriptions",
    packExpired: "Your Subscription has expired.",
    subscriptionCreated: "Subscription has been created.",
    subscriptionAlreadyExist: "Subscription already exist"
}

const SUCCESS = {
    errorBoolean: false,
    loginSuccess:  "Logged in Successfully",
    getUser: "User is fetched",
    loggedOutSuccessful: "logged out Successfully",
    checkMail: "Please check your email id for Link",
    checkOTP: "Please check your email id for OTP.",
    accountApprove: "Your account has been approved",
    otpVerified:  "OTP Verified Successfully",
    passUpdated: "Password is Updated successfully.",
   
   }

module.exports = {ERROR, SUCCESS}