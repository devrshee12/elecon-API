const { default: mongoose } = require("mongoose");
const Company = require("../models/Company");



const createCompany = async(req, res) => {
    try{    

        const {company_name, divisonId} = req.body;
        const company = await Company({company_name});
        company.division.push(divisonId);
        await company.save();
        res.status(500).json({valid: true, msg:"company has been created", data:company});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}



const getCompany = async(req, res) => {
    try{
        const companies = await Company.findOne({}).populate({
            path: "division",
            populate:{
                path:"department",
                model:"Department",
                populate: {
                    path: "sub_department",
                    model: "SubDepartment"
                }
            }
        });
        res.status(200).json({valid: true, msg: "yes", data: companies});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }

}







module.exports = {
    createCompany,
    getCompany
}