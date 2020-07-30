import React from 'react'
import './TablesPage.css'

class TablePages extends React.Component {
  state = {
    loading: true
  }

  render() {
    return (
      <div className="Tables-Page-Container">
        <div className="Tables-Page-Main">
          <h2>Collables</h2>
          <h3>Recently Viewed Collables</h3>
          <div className="Tables-Page-Row">
            <div className="Tables-Page-Card"></div>
            <div className="Tables-Page-Card"></div>
            <div className="Tables-Page-Card"></div>
            <div className="Tables-Page-Card"></div>
          </div>
          <h3>Your Collables</h3>
          <div className="Tables-Page-Row">
            <div className="Tables-Page-Card"></div>
            <div className="Tables-Page-Card"></div>
            <div className="Tables-Page-Card"></div>
            <div className="Tables-Page-Card"></div>
          </div>
          <h3>Shared Collables</h3>
          <div className="Tables-Page-Row">
            <div className="Tables-Page-Card"></div>
            <div className="Tables-Page-Card"></div>
            <div className="Tables-Page-Card"></div>
            <div className="Tables-Page-Card"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default TablePages