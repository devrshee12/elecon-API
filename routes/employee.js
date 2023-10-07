const express = require('express')
const router = express.Router()
const {getAllEmployees, getEmployee, forgotPasswordEmail, countEmpBasedOnRole, changePassword, getAllHOD} = require("../controllers/employee");
router.get('/getAllHOD', getAllHOD)
router.get('/getAll', getAllEmployees)
router.get('/:id', getEmployee)
router.post('/forgotPasswordEmail', forgotPasswordEmail)
router.post('/changePassword', changePassword)
router.get('/analysis/countBasedOnRole', countEmpBasedOnRole)


module.exports = router
