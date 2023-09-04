const mongoose = require("mongoose");



const Employee = new mongoose.Schema({
    emp_id: {
        type: String,
    },
    emp_name: {
        type: String,
    },
    password: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    hod_id: {
        type: String,
        default: ""
    },
    hod_emp_id: {
        type: String,
        default: ""
    },
    company_name: {
        type: String,
        default: ""
    },
    emp_extention: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: ""
    },
    phoneNumber:{
        type:String,
        default: ""
    },
    gate_name: {
        type: String,
        default: ""
    },
    created_date: {
        type: Date,
        default: new Date()
    },
    created_by: {
        type: String,
        default: ""
    },
    updated_date: {
        type: Date,
        default: new Date()
    },
    updated_by: {
        type: String,
        default: ""
    },
    deleted_date: {
        type: Date,
        default: ""
    },
    deleted_by: {
        type: String,
        default: ""
    },
    visitors: [

    ] 
})



module.exports = mongoose.model("Employee", Employee);