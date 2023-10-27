const express = require('express')
const router = express.Router()
const {createVehicleBill, getVehicleBills, getSpecificVehicleBill, editVehicleBill, deleteVehicleBill} = require("../controllers/vehicleBill")
router.post('/', createVehicleBill)
router.get('/getAll', getVehicleBills)
router.get('/:vb_id', getSpecificVehicleBill)
router.post('/:vb_id', editVehicleBill)
router.delete('/:vb_id', editVehicleBill)




module.exports = router
