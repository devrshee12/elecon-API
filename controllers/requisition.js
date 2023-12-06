const { default: mongoose } = require("mongoose");
const Requisition = require("../models/Requisition");







const createRequisition = async(req, res) => {
    try{
        const {company, division, department, employee} = req.body;
        const {activity, problem_desc, requisition_date} = req.body;
        const requisition = await Requisition.create({company, division, department, employee, activity, problem_desc, requisition_date: new Date(requisition_date), created_date: Date.now(), created_by:"admin", updated_by:"admin", updated_date:Date.now()})

        return res.status(200).json({valid: true, msg:"requisition has been created", data: requisition});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}


const getAllRequisitions = async(req, res) => {
    try{
        // const requisitions = await Requisition.find({});
        const requisitions = await Requisition.aggregate([
            
            {
              $lookup: {
                from: "employees", // Replace with the actual collection name for VendorMaster
                localField: "employee",
                foreignField: "_id",
                as: "employee",
              },
            },
            {
              $lookup: {
                from: "companies", // Replace with the actual collection name for Company
                localField: "company",
                foreignField: "_id",
                as: "company",
              },
            },
            {
              $lookup: {
                from: "divisions", // Replace with the actual collection name for Division
                localField: "division",
                foreignField: "_id",
                as: "division",
              },
            },
            {
              $lookup: {
                from: "departments", // Replace with the actual collection name for Department
                localField: "department",
                foreignField: "_id",
                as: "department",
              },
            },
            {
              $project: {
                created_date: 1,
                created_by: 1,
                updated_date: 1,
                updated_by: 1,
                activity: 1,
                problem_desc: 1,
                requisition_date: 1,
                employee: { $arrayElemAt: ["$employee.emp_name", 0] },
                company: { $arrayElemAt: ["$company.company_name", 0] },
                division: { $arrayElemAt: ["$division.division_name", 0] },
                department: { $arrayElemAt: ["$department.department_name", 0] },
                // Add other fields as needed
              },
            },
          ]);

          return res.status(200).json({valid: true, msg:"requisition has been fetched", data: requisitions});

    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}


const getAllRequisitionsForSpecific = async(req, res) => {
    try{
        // const requisitions = await Requisition.find({});
        const {emp_id} = req.params
        const requisitions = await Requisition.aggregate([
            {
              $lookup: {
                from: "companies", // Replace with the actual collection name for Company
                localField: "company",
                foreignField: "_id",
                as: "company",
              },
            },
            {
              $lookup: {
                from: "divisions", // Replace with the actual collection name for Division
                localField: "division",
                foreignField: "_id",
                as: "division",
              },
            },
            {
              $lookup: {
                from: "departments", // Replace with the actual collection name for Department
                localField: "department",
                foreignField: "_id",
                as: "department",
              },
            },
            {
              $project: {
                created_date: 1,
                created_by: 1,
                updated_date: 1,
                updated_by: 1,
                activity: 1,
                problem_desc: 1,
                requisition_date: 1,
                employee: 1,
                company: { $arrayElemAt: ["$company.company_name", 0] },
                division: { $arrayElemAt: ["$division.division_name", 0] },
                department: { $arrayElemAt: ["$department.department_name", 0] },
                // Add other fields as needed
                },
            },
          ]);

          const result = requisitions.filter((el) => {
            if(el.employee.toString() === emp_id){
                return true
            }
            else{
                return false;
            }

          })

          return res.status(200).json({valid: true, msg:"requisition has been fetched", data: result});

    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}



const editRequisition = async(req, res) => {
    try{
        const {r_id} = req.params;
        const {company, division, department, employee} = req.body;
        const {activity, problem_desc, requisition_date} = req.body;
        
        const requisition = await Requisition.findOne({_id: r_id})
        requisition.company = company
        requisition.division = division
        requisition.department = department
        requisition.employee = employee
        requisition.activity = activity
        requisition.problem_desc = problem_desc
        requisition.requisition_date = new Date(requisition_date)
        requisition.updated_date = Date.now()

        await requisition.save()
        return res.status(200).json({valid: true, msg:"requisition has been updated", data: requisition});

    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});

    }
}


const deleteRequisition = async(req, res) => {
    try{
        const {r_id} = req.params;
        await Requisition.findByIdAndDelete({_id: r_id});
        return res.status(200).json({valid: true, msg:"requisition has been deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}




module.exports = {
    createRequisition,
    getAllRequisitions,
    getAllRequisitionsForSpecific,
    editRequisition,
    deleteRequisition
}