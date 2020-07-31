const express = require('express')
const router = express.Router()
const tableCtrl = require('../../controllers/tables')

router.post('/', require('../../config/auth'), tableCtrl.createTable)
router.get('/:id', require('../../config/auth'), tableCtrl.getTableData)
router.post('/share', require('../../config/auth'), tableCtrl.shareTable)

module.exports = router;