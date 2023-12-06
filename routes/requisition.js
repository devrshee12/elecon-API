const express = require('express')
const router = express.Router()
const {createRequisition, getAllRequisitions, getAllRequisitionsForSpecific, editRequisition, deleteRequisition} = require("../controllers/requisition");
router.post('/', createRequisition)
router.get('/getAll', getAllRequisitions)
router.get('/:emp_id/getAll', getAllRequisitionsForSpecific)
router.post('/:r_id', editRequisition)
router.delete('/:r_id', deleteRequisition)





module.exports = router
