const mongoose = require("mongoose");



const Grievance = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    message: {
        type: String,
        default:""
    },
    by_whom_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },
    grievance_date: {
        type: Date,
        default: ""
    },
    status:{
        type: String,
        default: "pending"
    }
})



module.exports = mongoose.model("Grievance", Grievance);