const express = require('express')
const router = express.Router()
const {createDivision} = require("../controllers/division");
router.post('/', createDivision)



module.exports = router
