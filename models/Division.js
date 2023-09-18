const mongoose = require("mongoose");



const Division = new mongoose.Schema({
    division_name: {
        type: String,
        default: ""
    },
    department: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }]
})



module.exports = mongoose.model("Division", Division);