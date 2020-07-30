const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var tableSchema = new Schema({
  tableName: String,
  ssURL: String,
  sheetName: String,
  dataRange: String,
  data: String,
},
  {
    imestamps: true
  }
)

module.exports = mongoose.model('Collable', tableSchema)