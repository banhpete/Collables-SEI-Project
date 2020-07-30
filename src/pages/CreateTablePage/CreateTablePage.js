import React from 'react'
import "./CreateTablePage.css"
import { createTable } from '../../utils/tableServices'

class CreateTablePage extends React.Component {
  state = {
    tableName: "",
    ssURL: "",
    sheetName: "",
    dataRange: "",
    errMsg: ""
  }

  handleCreate = (e) => {
    e.preventDefault()
    let err = this.formHasErr()
    if (err) {
      this.setState({ errMsg: err })
      return;
    }
    createTable(this.state)
      .then((data) => {
        this.props.createTableUpdate(data)
        this.props.history.push('/')
      })
      .catch((err) => { this.setState({ errMsg: err }) })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  formHasErr = () => {
    // Check if any empty boxes
    if (!
      (this.state.tableName &&
        this.state.ssURL &&
        this.state.sheetName &&
        this.state.dataRange)
    ) return "Please Ensure All Boxes are Filled"

    let regex = new RegExp(/^[a-z]+[0-9]+:[a-z]+[0-9]+$/i)
    if (!regex.test(this.state.dataRange)) return "Please Ensure Data Range Uses the A1 notation"

    let urlParts = this.state.ssURL.split('/')
    if (!urlParts[urlParts.length - 2]) return "Please Ensure You Have Enterd the URL Correctly"
    else if (urlParts[urlParts.length - 2].length < 25) return "Please Ensure You Have Enterd the URL Correctly"

    this.setState({
      errMsg: ''
    })

    return false;
  }

  render() {
    let errMsg = this.state.errMsg ? <p className="Form-Error">{this.state.errMsg}</p> : null
    return (
      <div className="Create-Table-Page-Container">
        <form className="Create-Table-Form" onSubmit={this.handleCreate}>
          <h2>Create a New Collable</h2>
          {errMsg}
          <div className="Create-Table-Form-Row">
            <label>Give Your Collable a Name:</label>
            <input name="tableName" type="text" value={this.state.tableName} onChange={this.handleChange} />
          </div>
          <div className="Create-Table-Form-Row">
            <label>URL of Google Spreadsheet Collable Will Use:</label>
            <input name="ssURL" type="text" value={this.state.ssURL} onChange={this.handleChange} />
          </div>
          <div className="Create-Table-Form-Row">
            <label>Name of Sheet Collable will Use:</label>
            <input name="sheetName" type="text" value={this.state.sheetName} onChange={this.handleChange} />
          </div>
          <div className="Create-Table-Form-Row">
            <label>Range of Data in Google Spreadsheet (i.e. A1:F10):</label>
            <input name="dataRange" type="text" value={this.state.dataRange} onChange={this.handleChange} />
          </div>
          <div className="Create-Table-Btn-Row">
            <input className="btn" type="submit" value="Create Your Collable" />
          </div>
        </form>
      </div>
    )
  }
}

export default CreateTablePage