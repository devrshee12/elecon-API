const express = require('express')
const router = express.Router()
const {createGrievance, getAllGrievanceForEmp, getAllGrievance, resolvedAnalysis, countOfAllGrievance, countOfEmpGrievance, updateGrievance, getSpecificGrievance ,updateStatus, deleteGrievance, getAllGrievanceForHOD} = require("../controllers/grievance");
router.post('/:emp_id', createGrievance)
router.get('/:emp_id', getAllGrievanceForEmp)
router.get('/', getAllGrievance)
router.post('/:g_id/update', updateGrievance)
router.post('/:g_id/status', updateStatus)
router.delete('/:g_id', deleteGrievance)
router.get('/hod/:hod_id', getAllGrievanceForHOD)
router.get('/specific/:g_id', getSpecificGrievance)
router.get('/analysis/countStatus', countOfAllGrievance);
router.get('/analysis/empCountGrievance', countOfEmpGrievance);
router.get('/analysis/resolved', resolvedAnalysis);



module.exports = router
