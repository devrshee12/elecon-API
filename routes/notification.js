const express = require('express')
const router = express.Router()
const {createNotification, getNotification, getReadNotification, getUnreadNotification} = require("../controllers/notification");
router.post('/', createNotification)
router.get('/all/:emp_id', getNotification)
router.get('/read/:emp_id', getReadNotification)
router.get('/unread/:emp_id', getUnreadNotification)




module.exports = router
