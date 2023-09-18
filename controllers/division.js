const { default: mongoose } = require("mongoose");
const Division = require("../models/Division");




const createDivision = async(req, res) => {
    try{    

        const {division_name, departmentId} = req.body;
        const division = await Division({division_name});
        division.department.push(departmentId);
        await division.save();
        res.status(500).json({valid: true, msg:"division has been created", data:division});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}


module.exports = {
    createDivision
}