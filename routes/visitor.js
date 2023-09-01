const express = require('express')
const router = express.Router()
const {createVisitor, addAccessories, updateVisitor, getAllVisitor, getAccessories, getTodayVisitor, getTodayVisitorForEmp, getInTimeVisitorForEmp, getOutTimeVisitorForEmp, inTime, outTime, getRemainingVisitorForEmp, deleteVisitor, getVisitor} = require("../controllers/visitor")
router.post('/createVisitor', createVisitor)
router.post('/:id/addAccessories', addAccessories)
router.post('/:id/updateVisitor', updateVisitor)
router.get('/getAll', getAllVisitor)
router.get('/getTodayVisitor', getTodayVisitor)
router.get('/:emp_id/getTodayVisitorForEmp', getTodayVisitorForEmp)
router.get('/:emp_id/inVisitor', getInTimeVisitorForEmp)
router.get('/:emp_id/outVisitor', getOutTimeVisitorForEmp)
router.get('/:emp_id/remainingVisitor', getRemainingVisitorForEmp);
router.post('/:id/inTime', inTime)
router.post('/:id/outTime', outTime)
router.get('/:id/getAccessories', getAccessories)
router.delete('/:id/deleteVisitor', deleteVisitor)
router.get('/:id', getVisitor)



module.exports = router
