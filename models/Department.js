const mongoose = require("mongoose");



const Department = new mongoose.Schema({
    department_name: {
        type: String,
        default: ""
    },
    sub_department: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubDepartment"
    }]
})



module.exports = mongoose.model("Department", Department);