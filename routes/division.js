const express = require('express')
const router = express.Router()
const {createDivision, getSpecificDivision, updateDivision, deleteDivision, getAllDivision} = require("../controllers/division");
router.post('/', createDivision)
router.get('/getAll', getAllDivision)
router.get('/:d_id', getSpecificDivision)
router.post('/:d_id', updateDivision)
// router.post('/addDepartment/:d_id', addDepartment)
router.delete('/:d_id', deleteDivision)



module.exports = router
