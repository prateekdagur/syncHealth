const errorFunction =  (errorBit, msg, code, data) => {
    if (errorBit) return { is_error: errorBit, message: msg, responseCode: code };
    else return { is_error: errorBit, message: msg, data };
};

module.exports=  errorFunction;