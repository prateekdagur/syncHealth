const mongoose = require('mongoose');
const config = require('config');
// const winston = require('winston'); //logging library

module.exports = function () {
   
    
    const db_name = config.get('database.name');   
    const db_user = config.get('database.user');
    const db_pass = config.get('database.pass');
    
    conn_str = `mongodb://localhost/${db_name}`;

  
    mongoose.connect(conn_str, {useNewUrlParser: true, useUnifiedTopology: true },(err) => {
        		if (err) throw err;
        		console.log("connected to mongodb");
        	},)
    





   // .then(() => { 
        // if all is ok we will be here
        //winston.info(`Connected to ${conn_str} `)
        //console.log(`Connected to ${conn_str} `); 
        // winston.info(`Connected to ${conn_str} `)
    //})
   // .catch(err => { 
        // we will not be here...
       // console.error('App starting error:', err);  
        // winston.error(err.message, err);  
        //winston.error(err.message, err);
    //     process.exit(1);
    // });
    
}