const { default: mongoose } = require("mongoose");
const Department = require("../models/Department");





const createDepartment = async(req, res) => {
    try{    

        const {department_name, subdepartmentId} = req.body;
        const department = await Department({department_name});
        department.sub_department.push(subdepartmentId);
        await department.save();
        res.status(500).json({valid: true, msg:"department has been created", data:department});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}


module.exports = {
    createDepartment
}