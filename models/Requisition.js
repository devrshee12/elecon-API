const mongoose = require("mongoose");



const Requisition = new mongoose.Schema({
    
    emp_id: {
        type: String,
        default:""
    },
    
})



module.exports = mongoose.model("Requisition", Requisition);