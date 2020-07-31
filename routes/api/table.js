const express = require('express')
const router = express.Router()
const tableCtrl = require('../../controllers/tables')

router.post('/', require('../../config/auth'), tableCtrl.createTable)
router.get('/:id', require('../../config/auth'), tableCtrl.getTableData)

module.exports = router;