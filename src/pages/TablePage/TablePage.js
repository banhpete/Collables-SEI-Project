import React from 'react'
import Table from '../../components/Table/Table'
import './TablePage.css'
import { getTableData, shareTable } from '../../utils/tableServices'

class TablePage extends React.Component {

  state = {
    username: "",
    shareMenuShow: false,
    errMsg: "",
    msg: ""
  }

  componentDidMount = () => {
    getTableData(this.props.match.params.tableID).then((data) => {
      this.props.setTableData(data)
    })
  }

  toggleMenu = (e) => {
    this.setState({
      [e.target.getAttribute('name') + "Show"]: !this.state[e.target.getAttribute('name') + "Show"]
    })
  }

  handleChange = (e) => {
    this.setState({
      errMsg: "",
      msg: "",
      [e.target.name]: e.target.value
    })
  }

  handleShare = (e) => {
    e.preventDefault()
    shareTable(this.props.match.params.tableID, this.state.username, this.props.tableName)
      .then((data) => {
        return this.setState({ msg: "Complete" })
      })
      .catch((errMsg) => {
        return this.setState({ errMsg: errMsg })
      })
  }

  render() {
    let errMsg = this.state.errMsg ? <p className="Form-Error">{this.state.errMsg}</p> : null
    let msg = this.state.msg ? <p>{this.state.msg}</p> : null
    return (
      <div className="Table-Page-Container">
        <div className="Table-Page-Main">
          <div className="Table-Page-Main-Header">
            <h2>{this.props.tableName}</h2>
          </div>
          <Table data={this.props.data} tableID={this.props.match.params.tableID} setTableData={this.props.setTableData}
            colOrder={this.props.colOrder} rowOrder={this.props.rowOrder} setColOrder={this.props.setColOrder} setRowOrder={this.props.setRowOrder}></Table>
        </div>
        <div className="Table-Page-Secondary">
          <div className="Table-Page-Secondary-Row">
            <i name="shareMenu" className="fa fa-share-alt" style={{ fontSize: 26 }} onClick={this.toggleMenu}></i>
            {this.state.shareMenuShow ?
              <div className="shareMenu">
                <form onSubmit={this.handleShare}>
                  <p>Share with User</p>
                  {errMsg}
                  {msg}
                  <div className="row">
                    <label htmlFor="username">Enter name of User</label>
                    <input name="username" id="username" type="text" value={this.state.username} onChange={this.handleChange}></input>
                  </div>
                  <input type="submit" value="Share"></input>
                </form>
              </div> :
              null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default TablePage