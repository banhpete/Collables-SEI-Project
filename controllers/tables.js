const Table = require('../models/table')
const User = require('../models/user')
const { google } = require('googleapis')

function createTable(req, res, next) {
  client.authorize(function (err, tokens) {
    if (err) {
      return res.status(500).json({ err: "Server Issue" })
    } else {
      let urlParts = req.body.ssURL.split('/')
      let ssID = urlParts[urlParts.length - 2]
      let range = req.body.sheetName + "!" + req.body.dataRange
      gsrun(client, ssID, range)
        .then((data) => {
          User.findOne({ username: req.user.username }).select('+tables')
            .then((user) => {
              if (!user) throw new Error()
              req.body.data = data;
              Table.create(req.body)
                .then((table) => {
                  console.log(user)
                  user.tables.push(table._id)
                  user.save()
                    .then(() => {
                      return res.json(JSON.parse(table.data))
                    })
                })
            })
            .catch((err) => {
              return res.status(500).json({ errMsg: "Cannot find user." })
            })
        })
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
    return (JSON.stringify(res.data.values));
  } catch{
    throw new Error()
  }

}

module.exports = { createTable }