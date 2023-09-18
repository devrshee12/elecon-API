const mongoose = require("mongoose");



const Company = new mongoose.Schema({
    company_name: {
        type: String,
        default: ""
    },
    division: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Division"
    }]
})



module.exports = mongoose.model("Company", Company);