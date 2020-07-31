import React from 'react'
import Table from '../../components/Table/Table'
import './TablePage.css'

class TablePage extends React.Component {
  render() {
    return (
      <div className="Table-Page-Container">
        <div className="Table-Page-Main">
          <h2>Table Name</h2>
          <Table data={this.props.data}></Table>
        </div>
      </div>
    )
  }
}

export default TablePage