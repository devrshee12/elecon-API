const { default: mongoose } = require("mongoose");
const Department = require("../models/Department");
const Division = require("../models/Division");
const Company = require("../models/Company");





const createDepartment = async(req, res) => {
    try{    

        const {department_name, subdepartmentId} = req.body;
        const {division_id} = req.body;
        const department = await Department({department_name, created_by: "admin", created_date: Date.now(), updated_by: "admin", updated_date: Date.now()});
        if(subdepartmentId !== ""){
            department.sub_department.push(subdepartmentId);
        }
        await department.save();

        const division = await Division.findOne({_id: division_id});
        division.department.push(department._id);
        division.updated_date = Date.now();
        await division.save();
        res.status(200).json({valid: true, msg:"department has been created", data:department});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}


const getSpecificDepartment = async(req, res) => {
    try{
        const d_id = req.params.d_id;
        const department = await Department.findOne({_id: d_id});
        res.status(200).json({valid: true, msg:"department has been fetched", data:department});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}

const updateDepartment = async(req, res) => {
    try{
        const d_id = req.params.d_id;
        const {department_name} = req.body;
        const department = await Department.findOne({_id: d_id});
        department.department_name = department_name;
        department.updated_date = Date.now();
        await department.save();
        res.status(200).json({valid: true, msg:"department has been fetched", data:department});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}

const getAllDepartment = async(req, res) => {
    try{
        const companies = await Company.find({}).populate({
            path: "division",
            model: "Division",
            populate:{
                path:"department",
                model:"Department",
                populate: {
                    path: "sub_department",
                    model: "SubDepartment"
                }
            }
        });

        const result = [];
        companies.forEach((company) => {
            company.division.forEach((division) => {

                division.department.forEach((department) => {
                    const t = {};
                    t['department'] = department.department_name;
                    t['division'] = division.division_name;
                    t['company'] = company.company_name;
                    t['_id'] = department._id;
                    result.push(t);
                })

            })

        })
        res.status(200).json({valid: true, msg:"department has been fetched", data:result, count: result.length});

    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }
}


const deleteDepartment = async(req, res) => {
    try{
        const d_id = req.params.d_id;
        await Department.findByIdAndDelete({_id: d_id});
        res.status(200).json({valid: true, msg:"department has been fetched"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"somthing went wrong"});
    }

}




module.exports = {
    createDepartment,
    getSpecificDepartment,
    updateDepartment,
    deleteDepartment,
    getAllDepartment
}