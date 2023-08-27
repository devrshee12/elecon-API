const Employee = require("../models/Employee");


const createEmployee = async(req, res) => {
    try{
        const {emp_id, emp_name, role, gate_name, password} = req.body;
        const employee = await Employee.create({emp_id, emp_name, role, gate_name, password, created_date: new Date(), created_by: "admin", updated_by: new Date(), updated_by:"admin"});
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
        const {emp_id, emp_name, role, gate_name} = req.body;
        const emp = await Employee.findOne({_id});
        emp.emp_id = emp_id;
        emp.emp_name = emp_name;
        emp.role = role;
        emp.gate_name = gate_name
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