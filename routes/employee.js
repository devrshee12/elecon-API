const express = require('express')
const router = express.Router()
const {getAllEmployees, getEmployee} = require("../controllers/employee");
router.get('/getAll', getAllEmployees)
router.get('/:id', getEmployee)


module.exports = router
