const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var tableSchema = new Schema({
  tableName: String,
  ssURL: String,
  sheetName: String,
  dataRange: String,
  tableData: String,
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Table', tableSchema)