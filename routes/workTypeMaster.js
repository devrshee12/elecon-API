const express = require('express')
const router = express.Router()
const {createWorkType, getWorkTypes, getSpecificWorkType, editWorkType, deleteWorkType} = require("../controllers/workTypeMaster");
router.post('/', createWorkType)
router.get('/getAll', getWorkTypes)
router.get('/:l_id', getSpecificWorkType)
router.post('/:l_id', editWorkType)
router.delete('/:l_id', deleteWorkType)




module.exports = router
