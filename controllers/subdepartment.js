const { default: mongoose } = require("mongoose");
const SubDepartment = require("../models/SubDepartment");





const createSubDepartment = async(req, res) => {
    try{    

        const {sub_department_name, gl_code} = req.body;
        const sub_department = await SubDepartment({sub_department_name, gl_code});
        await sub_department.save();
        res.status(500).json({valid: true, msg:"sub department has been created", data:sub_department});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}


module.exports = {
    createSubDepartment
}