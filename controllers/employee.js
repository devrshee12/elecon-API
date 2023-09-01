const Employee = require("../models/Employee");
const Visitor = require("../models/Visitor");




const getAllEmployees = async(req, res) => {
    try{
        const employees = await Employee.find({});
        
        res.status(200).json({valid: true, msg:"data fetched", data:employees});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}


const getEmployee = async(req, res) => {
    try{
        const _id = req.params.id;
        const employee = await Employee.find({_id})
        res.status(200).json({valid: true, msg:"data fetched", data:employee});

    }
    catch(err){

        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}


const forgotPasswordEmail = async(req, res) => {
    try{
        const {username} = req.body;

        const emp = await Employee.findOne({name:username});
        if(!emp){
            return res.status(400).json({error: "emp does not exist"});
        }
        const emp_email = emp.email_id;
        console.log("emp email is ", emp_email);
        const otp = Math.random().toString().substr(2, 6)


        const sendMail = require("../services/emailService")
        sendMail({
            from: "elecon@gmail.com",
            // to: visitor_email,
            to: "devapanchhi12@gmail.com",
            subject: 'For Password Change in Elecon Admin Portal',
            text: `use below OTP to change your password`,
            html: require('../services/emailTemplate')({
                        otp:otp

                  })
          }).then(() => {
            return res.status(201).json({"valid": true, "msg": "email has been send"});
            
          }).catch(err => {
            return res.status(500).json({error: 'Error in email sending.'});
          });
    }
    catch(err){
        res.status(500).json({valid: false, msg: "something went wrong"});
    }


}



module.exports = {
    getAllEmployees,
    getEmployee,
    forgotPasswordEmail
}