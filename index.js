const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();

const errorHandler = require("./middlewares/errorMiddleware")

//DB config
const db = process.env.mongoURI;
mongoose.connect(db)
    .then(() => { console.log("Database connected successfully") })
    .catch((err) => { console.log(err) });

const app = express();


//Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//----------------------------------------------------------------------------

//module requiring

//admin
const adminAuth = require("./routes/admin/auth");
const property = require("./routes/admin/property");


//open-user
const kyc = require("./routes/open-user/kyc");

//----------------------------------------------------------------------------

//Routes middlewares

//admin
app.use("/admin/auth", adminAuth);
app.use("/admin/property", property);

//open-user
app.use("/kyc", kyc);


app.get("/health", (req, res) => {
    res.status(200).json("success");
})
//----------------------------------------------------------------------------

//passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

//Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port No ! ${PORT}`);
})