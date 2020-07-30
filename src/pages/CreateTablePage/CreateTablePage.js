import React from 'react'
import "./CreateTablePage.css"
import { createTable } from '../../utils/tableServices'

class CreateTablePage extends React.Component {
  state = {
    collableName: "",
    ssID: "",
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
    createTable(this.state).then((data) => console.log(data))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  formHasErr = () => {
    if (!
      (this.state.collableName &&
        this.state.ssID &&
        this.state.sheetName &&
        this.state.dataRange)
    ) return "Please Ensure All Boxes are Filled"

    if (!this.state.dataRange.includes(':')) return "Please Ensure Data Range Uses the A1 notation"

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
            <input name="collableName" type="text" value={this.state.collableName} onChange={this.handleChange} />
          </div>
          <div className="Create-Table-Form-Row">
            <label>ID of Google Spreadsheet Collable Will Use:</label>
            <input name="ssID" type="text" value={this.state.ssID} onChange={this.handleChange} />
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