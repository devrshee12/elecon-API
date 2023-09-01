const express = require('express')
const router = express.Router()
const {getAllEmployees, getEmployee, forgotPasswordEmail, changePassword} = require("../controllers/employee");
router.get('/getAll', getAllEmployees)
router.get('/:id', getEmployee)
router.post('/forgotPasswordEmail', forgotPasswordEmail)
router.post('/changePassword', changePassword)


module.exports = router
