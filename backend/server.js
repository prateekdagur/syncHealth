require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express")
swaggerDocument = require("./core/swagger.json");
var app = express();

app.use(bodyParser.json());
app.use(cors());
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
// );

app.use("/api-docs",
    swaggerUi.serve, swaggerUi.setup(swaggerDocument),
  );
 app.use("/api", require("./routes/userRoutes"));
 app.use("/api", require("./routes/paymentRoutes"));
 app.use("/api", require("./routes/admin/subscriptionRoutes"));
 
 app.listen(process.env.PORT,()=>console.log(`server started at port: ${process.env.PORT}`));

