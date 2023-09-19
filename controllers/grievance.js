const { default: mongoose } = require("mongoose");
const Grievance = require("../models/Grievance");
const Employee = require("../models/Employee");


const createGrievance = async(req, res) => {
    try{
        const emp_id = req.params.emp_id;
        const {title, message} = req.body;
        const grievance = await Grievance.create({title, message, by_whom_id: emp_id, grievance_date: new Date()});

        return res.status(200).json({valid: true, msg: "Grievance has been created", data: grievance});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}


const getAllGrievance = async(req, res) => {
    try{
        const result = await Grievance.find({}).populate("by_whom_id");
        return res.status(200).json({valid: true, msg: "all grievances has been fetched", data: result.reverse(), count: result.length});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong asd"});
    }
}


const getAllGrievanceForEmp = async(req, res) => {
    try{
        const emp_id = req.params.emp_id
        const result = await Grievance.find({by_whom_id: emp_id});
        return res.status(200).json({valid: true, msg: "all grievances has been fetched", data: result.reverse(), count: result.length});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }

}


const updateGrievance = async(req, res) => {
    try{
        const g_id = req.params.g_id;
        const {title, message} = req.body;
        const g = await Grievance.findOne({_id: g_id});
        g.title = title;
        g.message = message;
        await g.save()
        return res.status(200).json({valid: true, msg: "grievance has been updated", data: g});

    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}


const updateStatus = async(req, res) => {
    try{
        const g_id = req.params.g_id;
        const {status} = req.body;
        const g = await Grievance.findOne({_id: g_id});
        g.status = status;
        await g.save()
        return res.status(200).json({valid: true, msg: "status has been updated", data: g});

    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}


const deleteGrievance = async(req, res) => {
    try{
        const g_id = req.params.g_id;
        await Grievance.findOneAndDelete({_id: g_id});
        return res.status(200).json({valid: true, msg: "Grievance has been deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}


const getAllGrievanceForHOD = async(req, res) => {
    try{
        const hod_id = req.params.hod_id
        const emps = await Employee.find({hod_id: hod_id}, {_id: 1})
        const filterEmps = emps.map((emp) => {
            return emp._id
        })
        console.log(filterEmps);

        const allG = await Grievance.find({
            by_whom_id: {
                $in: filterEmps
            }
        }).populate("by_whom_id");

        return res.status(200).json({valid: true, msg: "got all data", data: allG.reverse(), count: allG.length});

    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }

}


const getSpecificGrievance = async(req, res) => {
    try{

        const g_id = req.params.g_id;
        const result = await Grievance.findOne({_id:g_id}).populate("by_whom_id");
        return res.status(200).json({valid: true, msg: "got data", data: result});


    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }

}


const countOfAllGrievance = async(req, res) => {
    try{
        const result = await Grievance.aggregate([
            {
                $group : {
                    _id: "$status",
                    count: {$sum: 1}
                }
            }
        ])

        return res.status(200).json({valid: true, msg: "got data", data: result});

        
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}





module.exports = {
    createGrievance,
    getAllGrievanceForEmp,
    getAllGrievance,
    updateGrievance,
    updateStatus,
    deleteGrievance,
    getAllGrievanceForHOD,
    getSpecificGrievance,
    countOfAllGrievance
}