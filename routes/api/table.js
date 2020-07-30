const express = require('express')
const router = express.Router()
const tableCtrl = require('../../controllers/tables')

router.post('/', require('../../config/auth'), tableCtrl.createTable)

module.exports = router;