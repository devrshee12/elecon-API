const { default: mongoose } = require("mongoose");
const DriverMaster = require("../models/DriverMaster");





const createDriver = async(req, res) => {
    try{    
        const {contractor, employee_id, first_name, middle_name, last_name, address, city, pincode, state, phone_no, emergancy_contact_person, emergancy_contact_no, birth_date, join_date, license_no, license_exp_date, releave_date} = req.body;
        const {company, division, department} = req.body;
        const driver = await  DriverMaster.create({contractor, employee_id, first_name, middle_name, last_name, address, city, pincode, state, phone_no, emergancy_contact_person, emergancy_contact_no, birth_date: new Date(birth_date), join_date: new Date(join_date), license_no, license_exp_date: new Date(license_exp_date), releave_date: new Date(releave_date), company, division, department,created_by: "admin", created_date: Date.now(), updated_by:"admin", updated_date: Date.now()});
        return res.status(200).json({valid: true, msg:"driver has been created", data:driver});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getDrivers = async(req, res) => {
    try{
        const drivers = await DriverMaster.find({});
        return res.status(200).json({valid: true, msg:"drivers has been fetched", data:drivers, count: drivers.length});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }
}

const getSpecificDriver = async(req, res) => {
    try{
        const d_id = req.params.d_id;
        const driver = await DriverMaster.findOne({_id: d_id}).populate("company", "company_name").populate("division", "division_name").populate("department", "department_name");
        return res.status(200).json({valid: true, msg:"driver has been fetched", data:driver});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}

const editDriver = async(req, res) => {
    try{
        const d_id = req.params.d_id;

        const {contractor, employee_id, first_name, middle_name, last_name, address, city, pincode, state, phone_no, emergancy_contact_person, emergancy_contact_no, birth_date, join_date, license_no, license_exp_date, releave_date} = req.body;
        const {company, division, department} = req.body;
        const driver = await DriverMaster.findOne({_id: d_id});
        driver.contractor = contractor 
        driver.employee_id = employee_id 
        driver.first_name = first_name 
        driver.middle_name = middle_name 
        driver.last_name = last_name 
        driver.address = address 
        driver.city = city 
        driver.pincode = pincode 
        driver.state = state 
        driver.phone_no = phone_no 
        driver.emergancy_contact_person = emergancy_contact_person 
        driver.emergancy_contact_no = emergancy_contact_no 
        driver.birth_date = new Date(birth_date)
        driver.join_date = new Date(join_date)
        driver.license_no = license_no 
        driver.license_exp_date = new Date(license_exp_date)
        driver.releave_date = new Date(releave_date) 
        driver.company = company
        driver.division = division 
        driver.department = department 
        driver.updated_date = Date.now();
        await driver.save();
        return res.status(200).json({valid: true, msg:"driver has been updated", data:driver});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


const deleteDriver = async(req, res) => {
    try{
        const d_id = req.params.d_id;
        await DriverMaster.findByIdAndDelete({_id: d_id});
        return res.status(200).json({valid: true, msg:"driver has been deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({valid: false, msg:"something went wrong"});
    }

}


module.exports = {
    createDriver,
    getDrivers,
    getSpecificDriver,
    editDriver,
    deleteDriver

}