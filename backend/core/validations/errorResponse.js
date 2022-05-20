const errorResponse =  (status, validations, message, code, data) => {
    if (status) return { is_error: status, message: message, errors: validations, responseCode: code, data};
    else return { is_error: status, errors: "", responseCode: code, data };
};

module.exports=  errorResponse;