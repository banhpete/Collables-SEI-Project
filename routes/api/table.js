const express = require('express')
const router = express.Router()
const tableCtrl = require('../../controllers/tables')

router.post('/', tableCtrl.createTable)

module.exports = router;