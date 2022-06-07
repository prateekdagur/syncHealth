require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require('fs')
const https = require('https')
const cors = require("cors");
const swaggerUi = require("swagger-ui-express")
swaggerDocument = require("./core/swagger.json");
var app = express();

app.use(bodyParser.json());
//app.use(cors({origin: "http://adminsynchealth.trigma.in"}));
// app.use(cors({origin: "http://localhost:4200"}));
app.use(cors())
require('./config/database')();
// mongoose.connect(
// 	process.env.MONGODB_URL,
// 	{
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	},
// 	(err) => {
// 		if (err) throw err;
// 		console.log("connected to mongodb");
// 	},
// )
// app.use("/api-docs",
//     swaggerUi.serve, swaggerUi.setup(swaggerDocument),
//   );
 app.use("/api/auth", require("./routes/userRoutes"));
 app.use("/api/payment", require("./routes/paymentRoutes"));
 app.use("/api/subscription", require("./routes/subscription"));
 app.use("/api/category", require("./routes/category"));
 app.use("/api/role", require("./routes/role"));
 app.use("/api/questionAnswer", require("./routes/questionAnswerRoutes"));
 app.use("/api/admin/subscription", require("./routes/admin/subscriptionRoutes"));
 app.use("/api/admin/category", require("./routes/admin/categoryRoutes"));
 app.use("/api/admin/role", require("./routes/admin/role"));
 app.use("/api/admin/questionAnswer", require("./routes/admin/questionAnswerRoutes"));
 app.use("/api/admin/user", require("./routes/admin/users"));


 var privateKey = fs.readFileSync( '/etc/letsencrypt/live/apisynchealth.trigma.in/privkey.pem' );
 var certificate = fs.readFileSync( '/etc/letsencrypt/live/apisynchealth.trigma.in/fullchain.pem' );
 
 https.createServer({
     key: privateKey,
     cert: certificate
 }, app).listen(process.env.PORT);


 //app.listen(process.env.PORT,()=>console.log(`server started at port: ${process.env.PORT}`));

