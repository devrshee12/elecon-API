const express = require('express')
const router = express.Router()
const {createRequisition, getAllRequisitions, changeStatus, escalateRequisition, getRequisitionForHod, getAllEscalatedRequisitions, remindRequisition, resendRequisition, getAllRequisitionsForSpecific, editRequisition, deleteRequisition} = require("../controllers/requisition");
router.post('/', createRequisition)
router.get('/getAll', getAllRequisitions)
router.get('/:emp_id/getAll', getAllRequisitionsForSpecific)
router.post('/:r_id', editRequisition)
router.delete('/:r_id', deleteRequisition)
router.post('/update/:r_id/status', changeStatus)
router.post('/update/:r_id/escalate', escalateRequisition)
router.post('/update/:r_id/remind', remindRequisition)
router.post('/update/:r_id/resend', resendRequisition)
router.get('/admin/escalated/getAll', getAllEscalatedRequisitions)
router.get('/hod/:hod_id/getAll', getRequisitionForHod)






module.exports = router
