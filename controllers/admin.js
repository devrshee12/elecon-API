const { default: mongoose } = require("mongoose");
const Employee = require("../models/Employee");


const createEmployee = async(req, res) => {
    try{
        const {emp_id, emp_name, role, gate_name, password, hod_id, hod_emp_id, email, company_name, phoneNumber} = req.body;

        const c1 = await Employee.find({emp_id});
        if(c1){
            return res.status(500).json({valid: false, msg:"somthing went wrong"});
        }
        const c2 = await Employee.find({emp_name});
        if(c2){
            return res.status(500).json({valid: false, msg:"somthing went wrong"});
        }
        const employee = await Employee.create({emp_id, emp_name, role, gate_name,email, company_name, phoneNumber, password, hod_id, hod_emp_id, created_date: new Date(), created_by: "admin", updated_by: new Date(), updated_by:"admin"});
        res.status(200).json({valid: true, msg:"employee has been created", data: employee});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}


const updateEmployee = async(req, res) => {
    try{
        const _id = req.params.id;
        const {emp_id, emp_name, role, gate_name, password, email, company_name, phoneNumber, hod_id, hod_emp_id} = req.body;
        const emp = await Employee.findOne({_id});
        emp.emp_id = emp_id;
        emp.emp_name = emp_name;
        emp.role = role;
        emp.phoneNumber = phoneNumber;
        emp.email = email;
        emp.company_name = company_name;
        emp.hod_id = hod_id;
        emp.hod_emp_id = hod_emp_id;
        emp.gate_name = gate_name
        emp.password = password
        emp.updated_date = new Date()
        emp.updated_by = "admin"
        
        await emp.save();
        res.status(200).json({valid: true, msg:"employee has been updated", data: emp});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}


const deleteEmployee = async(req, res) => {
    try{
        const _id = req.params.id;
        
        const emp = await Employee.findByIdAndDelete({_id});
        res.status(200).json({valid: true, msg:"employee has been deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}



module.exports = {
    createEmployee,
    updateEmployee,
    deleteEmployee
}