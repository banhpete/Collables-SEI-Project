import React from 'react'
import './TablesPage.css'

class TablesPage extends React.Component {
  state = {
    loading: true
  }

  handleCardClick = (idx) => {
    this.props.history.push('/table/' + idx)
  }

  render() {
    let recentTables = this.props.recentTables[0] ?
      this.props.recentTables.map((tableIdx) => {
        let table = tableIdx[0] === 'u' ? this.props.userTables[tableIdx[1]] : this.props.sharedTables[tableIdx[1]]
        return (
          <div key={tableIdx} className="Tables-Page-Card" onClick={() => this.handleCardClick(table._id)}>{table.tableName}</div>
        )
      }) :
      <p>No Collables Recently Viewed</p>

    let userTables = this.props.userTables[0] ?
      this.props.userTables.map((table) => {
        return (
          <div key={table._id} className="Tables-Page-Card" onClick={() => this.handleCardClick(table._id)}>{table.tableName}</div>
        )
      }) :
      <p>No Collables Made</p>


    let sharedTables = this.props.sharedTables[0] ?
      this.props.sharedTables.map((table) => {
        return (
          <div key={table._id} className="Tables-Page-Card" onClick={() => this.handleCardClick(table._id)}>{table.tableName}</div>
        )
      }) :
      <p>No Collables Shared With You</p>

    return (
      <div className="Tables-Page-Container">
        <div className="Tables-Page-Main">
          <h2>Collables</h2>
          <h3>Recently Viewed Collables</h3>
          <div className="Tables-Page-Row">
            {recentTables}
          </div>
          <h3>Your Collables</h3>
          <div className="Tables-Page-Row">
            {userTables}
          </div>
          <h3>Shared Collables</h3>
          <div className="Tables-Page-Row">
            {sharedTables}
          </div>
        </div>
      </div>
    )
  }
}

export default TablesPage