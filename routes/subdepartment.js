const express = require('express')
const router = express.Router()
const {createSubDepartment} = require("../controllers/subdepartment");
router.post('/', createSubDepartment)




module.exports = router
