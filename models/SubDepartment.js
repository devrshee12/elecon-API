const mongoose = require("mongoose");



const SubDepartment = new mongoose.Schema({
    sub_department_name: {
        type: String,
        default: ""
    },
    gl_code:{
        type:String,
        default:""
    }
})



module.exports = mongoose.model("SubDepartment", SubDepartment);