const { default: mongoose } = require("mongoose");
const WorkTypeMaster = require("../models/WorkTypeMaster");








const createWorkType = async(req, res) => {
    try{    
        const {work_type, company, division, department} = req.body;
        const workType = await  WorkTypeMaster.create({work_type, company, division, department, created_by: "admin", created_date: Date.now(), updated_by:"admin", updated_date: Date.now()});
        return res.status(200).json({valid: true, msg:"workType has been created", data:workType});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getWorkTypes = async(req, res) => {
    try{
        const workTypes = await WorkTypeMaster.find({});
        return res.status(200).json({valid: true, msg:"workTypes has been fetched", data:workTypes, count: workTypes.length});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getSpecificWorkType = async(req, res) => {
    try{
        const w_id = req.params.w_id;
        const workType = await WorkTypeMaster.findOne({_id: w_id});
        return res.status(200).json({valid: true, msg:"workType has been fetched", data:workType});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}

const editWorkType = async(req, res) => {
    try{
        const w_id = req.params.w_id;

        const {work_type, company, division, department} = req.body;
        
        const workType = await WorkTypeMaster.findOne({_id: w_id});
        workType.work_type = work_type 
        workType.company = company 
        workType.division = division 
        workType.department = department 
        workType.updated_date = Date.now();
        await workType.save();
        return res.status(200).json({valid: true, msg:"workType has been updated", data:workType});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


const deleteWorkType = async(req, res) => {
    try{
        const w_id = req.params.w_id;
        await WorkTypeMaster.findByIdAndDelete({_id: w_id});
        return res.status(200).json({valid: true, msg:"location has been deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


module.exports = {
    createWorkType,
    getWorkTypes,
    getSpecificWorkType,
    editWorkType,
    deleteWorkType

}