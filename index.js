const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

const connectDB = require("./db/connect");
const PORT = 5000 || process.env.PORT;



const corsOptions = {
  // origin: process.env.ALLOWED_CLIENTS.split(',')
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
// console.log(corsOptions.origin);

app.use(cors(corsOptions));
app.use(cookieParser());

const employee = require("./routes/employee");
const admin = require("./routes/admin");
const visitor = require("./routes/visitor")
const auth = require("./routes/auth");
const gateUser = require("./routes/gateUser");



app.use(express.json({limit: "100mb"}));


//routes
app.use("/api/v1/employee", employee);
app.use("/api/v1/admin", admin);
app.use("/api/v1/visitor", visitor);
app.use("/api/v1/auth", auth);
app.use("/api/v1/gateUser", gateUser);















app.post("/api/v1/admin/login", (req, res) => {
    try{
        const {username, password} = req.body;

        if(username === "admin" && password === "admin"){

            const token = jwt.sign({ role: "admin", username},
            process.env.JWT_ACCESS_TOKEN_SECRET,
            {
              expiresIn: "30d",
            })

            res.cookie("token", token, {
                expires: new Date(Date.now() + ( 30 * 24 * 60 * 60 * 1000)), // ms
                httpOnly: false
            })

            res.status(200).json({valid: true, msg: "log in as an admin"});
        }
        else{
            res.status(200).json({valid: false, msg: "you cant login as an admin"});
        }

    }   
    catch(err){
        console.log(err);
    }
})













const start = async () => {
    console.log("this time");
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(PORT, () =>
        console.log(`Server is listening on port ${PORT}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
start();


