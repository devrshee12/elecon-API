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


const countOfEmpGrievance = async(req, res) => {
    try{
        const result = await Grievance.find({}).populate("by_whom_id");

        

        let mp = new Map();
        result.forEach((el) => {
            const temp = el?.by_whom_id?.emp_name
            if(mp.has(temp)){
                mp.set(temp, mp.get(temp) + 1)
            }
            else{
                mp.set(temp, 1);
            }
        })

        const emps = await Employee.find({role: "employee"});

        

        const ans = emps.map((el) => {
            if(mp.has(el?.emp_name)){
                return {label: el?.emp_name, value: mp.get(el?.emp_name)};
            }
            else{
                return {label: el?.emp_name, value: 0};
            }
        })


        return res.status(200).json({valid: true, msg: "got data", data: ans});
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }

}


const resolvedAnalysis = async(req, res) => {
    try{
        const all = await Grievance.find({});
        
        const total = all.length;
        const resolvedCount = all.reduce((total, el) => {
            if(el?.status !== "pending"){
                return total + 1;
            }
            else{
                return total + 0;
            }
        }, 0)

        const resolvedPercentage = parseInt((resolvedCount/total)*100, 10);
        return res.status(200).json({valid: true, msg: "got data", data: {total, resolvedCount, resolvedPercentage : parseInt(resolvedPercentage, 10), pendingCount: total - resolvedCount}});



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
    countOfAllGrievance,
    countOfEmpGrievance,
    resolvedAnalysis
}