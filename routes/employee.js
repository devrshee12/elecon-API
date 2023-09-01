const express = require('express')
const router = express.Router()
const {getAllEmployees, getEmployee, forgotPasswordEmail} = require("../controllers/employee");
router.get('/getAll', getAllEmployees)
router.get('/:id', getEmployee)
router.post('/forgotPasswordEmail', forgotPasswordEmail)


module.exports = router
