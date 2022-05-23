const errorResponse =  (status, validations, message, code, data,response) => {
     console.log(response, "0000000000000")
     return response.json({ is_error: status, message: message, errors: validations, responseCode: code, data});
     exit();
};

const successResponse =  (status, message, code, data, response) => {
     return response.json({ is_error: status, message: message, errors: "", responseCode: code, data });
     exit();
 };

module.exports=  {errorResponse, successResponse};