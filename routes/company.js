const express = require('express')
const router = express.Router()
const {createCompany, getCompanies, deleteCompany, updateCompany, getSpecificCompany} = require("../controllers/company");
router.post('/', createCompany)
router.get('/getAll', getCompanies)
router.post('/c:id', updateCompany)
router.get('/c:id', getSpecificCompany)
router.delete('/c:id', deleteCompany)



module.exports = router
