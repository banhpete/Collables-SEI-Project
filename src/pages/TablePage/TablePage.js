import React from 'react'
import Table from '../../components/Table/Table'
import './TablePage.css'
import { getTableData } from '../../utils/tableServices'

class TablePage extends React.Component {

  componentDidMount = () => {
    getTableData(this.props.match.params.tableID).then((data) => {
      this.props.setTableData(data)
    })
  }

  render() {
    return (
      <div className="Table-Page-Container">
        <div className="Table-Page-Main">
          <h2>{this.props.tableName}</h2>
          <Table data={this.props.data} tableID={this.props.match.params.tableID} setTableData={this.props.setTableData}
            colOrder={this.props.colOrder} rowOrder={this.props.rowOrder} setColOrder={this.props.setColOrder} setRowOrder={this.props.setRowOrder}></Table>
        </div>
      </div>
    )
  }
}

export default TablePage