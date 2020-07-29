import React from 'react'
import Table from '../../components/Table/Table'

class TablePage extends React.Component {
  render() {
    return (
      <div>
        <h2>Table Page</h2>
        <Table data={this.props.data} />
      </div>

    )
  }
}

export default TablePage