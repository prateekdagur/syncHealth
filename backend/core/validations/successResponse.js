const successResponse =  (status, message, code, data) => {
    if (status) return { is_error: status, message: message, errors: "", responseCode: code, data };
    else return { is_error: status, message, errors: "", responseCode: code, data };
};

module.exports=  successResponse;