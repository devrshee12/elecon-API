const Employee = require("../models/Employee");




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




module.exports = {
    getAllEmployees,
    getEmployee
}