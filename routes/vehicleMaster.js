const express = require('express')
const router = express.Router()
const {createVehicle, getVehicles, getSpecificVehicle, editVehicle, deleteVehicle} = require("../controllers/vehicleMaster");
router.post('/', createVehicle)
router.get('/getAll', getVehicles)
router.get('/:a_id', getSpecificVehicle)
router.post('/:a_id', editVehicle)
router.delete('/:a_id', deleteVehicle)




module.exports = router
