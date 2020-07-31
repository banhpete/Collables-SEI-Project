const Table = require('../models/table')
const User = require('../models/user')
const { google } = require('googleapis')

console.log(process.env.GOOGLE_PRIVATE_KEY);

function createTable(req, res, next) {
  client.authorize(function (err, tokens) {
    if (err) {
      return res.status(500).json({ err: "Server Issue" })
    } else {
      let urlParts = req.body.ssURL.split('/')
      let ssID = urlParts[urlParts.length - 2]
      let range = req.body.sheetName + "!" + req.body.dataRange
      // Run Google API to grab spreadsheet data
      gsrun(client, ssID, range)
        // If google API is successful, find if user exists. 
        .then((data) => {
          User.findOne({ username: req.user.username }).select('+userTables')
            .then((user) => {
              if (!user) throw new Error()
              req.body.tableData = data;
              Table.create(req.body)
                .then((table) => {
                  user.userTables.push(table._id)
                  user.updateRecent('u' + (user.userTables.length - 1), () => {
                    return user.save()
                      .then((user) => {
                        return res.json({
                          tableID: table._id,
                          tableData: JSON.parse(table.tableData),
                          tableName: table.tableName,
                          recentTables: user.recentTables
                        })
                      })
                  })
                })
            })
            .catch((err) => {
              return res.status(500).json({ errMsg: "Cannot find user." })
            })
        })
        // If google API failed, then the user given invalid inputs.
        .catch((err) => {
          return res.status(400).json({ errMsg: "Inputs for Spreadsheet are not valid. Try Again." })
        })
    }
  })
}

// Functions for Google Spreadsheet API
const client = new google.auth.JWT(
  process.env.GOOGLE_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY,
  ['https://www.googleapis.com/auth/spreadsheets'],
)

async function gsrun(cl, ssID, range) {
  const gsapi = google.sheets({ version: 'v4', auth: cl });
  const opt = {
    spreadsheetId: ssID,
    range: range,
  }

  try {
    let res = await gsapi.spreadsheets.values.get(opt);
    let rowLength = 0;
    res.data.values.forEach((r) => {
      if (r.length > rowLength) rowLength = r.length;
      return;
    })
    let tableData = res.data.values.map((r) => {
      while (r.length < rowLength) {
        r.push('')
      }
      return r
    })
    return (JSON.stringify(tableData));
  } catch{
    throw new Error()
  }

}

function getTableData(req, res, next) {
  User.findOne({ $and: [{ username: req.user.username }, { $or: [{ sharedTables: req.params.id }, { userTables: req.params.id }] }] })
    .then((user) => {
      if (!user) return res.status(400).json({ errMsg: "Table ID does not exist or User does not have access" })
      Table.findById(req.params.id).then((table) => {
        res.json(table)
      })
    }).catch(() => {
      return res.status(400).json({ errMsg: "Table ID does not exist or User does not have access" })
    })
}

function shareTable(req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) return res.status(400).json({ errMsg: "Invalid username" })
      user.sharedTables.push(req.body.tableID)
      user.save()
        .then((user) => {
          res.json({ msg: "Complete" })
        })
    })
}

module.exports = { createTable, getTableData, shareTable }