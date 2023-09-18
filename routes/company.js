const express = require('express')
const router = express.Router()
const {createCompany, getCompany} = require("../controllers/company");
router.post('/', createCompany)
router.get('/', getCompany)



module.exports = router
