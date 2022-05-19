// let Joi = require('joi')
// const errorFunction = require("./responseFunction");

// // DRY our code with higher order function
// const createValidator = (schema) => 
//   async (payload) => {
//     //   console.log(schema,".........")

//       try {
//         const value = await schema.validate(payload);
//         console.log(value.error.details[0].message, "vvvvvvvv")
//         if(value.error){
//         console.log(value.error.details[0].message, "eeeeeeee")
//               return res.json(true, value.error.details[0].message, 500)
//                 //return res.json(errorFunction(true, `Error in User Data : ${value.error.details[0].message}`, 500))
//         } else{
//             next()
//         }
       
//     }
//     catch (err) { 
//         return false
//     }

//     // return schema.validate(payload, {
//     //   // shows all error messages instead of first error message
//     //   abortEarly: false
//     // })
//   }

// module.exports = createValidator