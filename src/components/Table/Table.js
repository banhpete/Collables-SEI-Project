import React from 'react'
import './Table.css';

class Table extends React.Component {
  // Get Order Of An Array 
  getOrder = (arr) => {
    let numOfRows = arr.length;
    let order = [];
    for (let i = 0; i < numOfRows; i++) {
      order.push(i)
    }
    return order
  }

  state = {
    userSelect: false,
    columnSelected: null,
    rowSelected: null,
    user_x: 0,
    user_y: 0,
    offset_x: 0,
    offset_y: 0,
    loading: true
  }

  // Handle Column Being Dragged
  handleMouseDownCol = (e) => {
    var rect = e.target.getBoundingClientRect();

    this.setState({
      userSelect: true,
      columnSelected: e.target.getAttribute('index'),
      offset_x: rect.left,
      offset_y: rect.top,
      rowSelected: null,
    })

    // Event Handler Functions
    const updatePosition = (e) => {
      this.setState({
        user_x: e.x - this.state.offset_x + 5,
        user_y: e.y - this.state.offset_y + 5,
      })
    }

    const removeMovement = () => {
      this.setState({
        userSelect: false,
        user_x: 0,
        user_y: 0,
      })
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseup', removeMovement)
    }

    // Event Hanlder Added to Window to handle Dragging
    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseup', removeMovement)
  }

  // Handle Column Swap
  handeMouseEnterCol = (e) => {
    var rect = e.target.getBoundingClientRect();
    this.setState({
      offset_x: rect.left,
      offset_y: rect.top,
    })
    let selectedCol = parseInt(this.state.columnSelected)
    let shiftingCol = parseInt(e.target.getAttribute('index'))
    if (isNaN(shiftingCol)) return
    let arrCopy = [...this.props.colOrder]
    arrCopy = arrCopy.map((col, idx) => {
      if (idx === selectedCol) return this.props.colOrder[shiftingCol]
      if (this.props.colOrder[selectedCol] < this.props.colOrder[shiftingCol]) {
        if (this.props.colOrder[idx] > this.props.colOrder[selectedCol] && this.props.colOrder[idx] <= this.props.colOrder[shiftingCol]) {
          return --arrCopy[idx]
        } else {
          return arrCopy[idx]
        }
      } else {
        if (this.props.colOrder[idx] < this.props.colOrder[selectedCol] && this.props.colOrder[idx] >= this.props.colOrder[shiftingCol]) {
          return ++arrCopy[idx]
        } else {
          return arrCopy[idx]
        }
      }
    })
    this.props.setColOrder(arrCopy)
  }

  // Handle Row Being Dragged
  handleMouseDownRow = (e) => {
    var rect = e.target.getBoundingClientRect();
    this.setState({
      userSelect: true,
      rowSelected: e.target.getAttribute('index'),
      offset_x: rect.left,
      offset_y: rect.top,
      columnSelected: null,
    })

    // Event Handler Functions
    const updatePosition = (e) => {
      this.setState({
        user_x: e.x - this.state.offset_x + 5,
        user_y: e.y - this.state.offset_y + 5,
      })
    }

    const removeMovement = () => {
      this.setState({
        userSelect: false,
        user_x: 0,
        user_y: 0,
      })
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseup', removeMovement)
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseup', removeMovement)
  }

  // Handle Row Swap
  handeMouseEnterRow = (e) => {
    var rect = e.target.getBoundingClientRect();
    this.setState({
      offset_x: rect.left,
      offset_y: rect.top,
    })
    let selectedRow = parseInt(this.state.rowSelected)
    let shiftingRow = parseInt(e.target.getAttribute('index'))
    let arrCopy = [...this.props.rowOrder]
    arrCopy = arrCopy.map((row, idx) => {
      if (idx === selectedRow) return this.props.rowOrder[shiftingRow]
      if (this.props.rowOrder[selectedRow] < this.props.rowOrder[shiftingRow]) {
        if (this.props.rowOrder[idx] > this.props.rowOrder[selectedRow] && this.props.rowOrder[idx] <= this.props.rowOrder[shiftingRow]) {
          return --row
        } else {
          return row
        }
      } else {
        if (this.props.rowOrder[idx] < this.props.rowOrder[selectedRow] && this.props.rowOrder[idx] >= this.props.rowOrder[shiftingRow]) {
          return ++row
        } else {
          return row
        }
      }
    })
    this.props.setRowOrder(arrCopy)
  }

  render() {

    let cellStyle = {
      transform: `translate(${this.state.user_x}px, ${this.state.user_y}px)`
    }

    let tableheaders = <div key="header" className="collable-row">
      {this.props.data[0].map((header, idx) => {
        if (idx === 0) return <div key="empty">{header}</div>
        return (
          <div
            key={header}
            index={idx}
            style={this.state.columnSelected == idx ? { order: this.props.colOrder[idx], ...cellStyle } : { order: this.props.colOrder[idx] }}
            className={this.state.userSelect && (this.state.columnSelected == idx) ? 'selected' : ''}
            onMouseDown={this.handleMouseDownCol}
            onMouseEnter={this.state.userSelect && this.state.columnSelected && (idx != this.state.columnSelected) ? (e) => { this.handeMouseEnterCol(e) } : null}>
            <p>{header}</p>
          </div>)
      })
      }</div>

    let tablerows = this.props.data.map((row, rowidx) => {
      if (rowidx === 0) return null
      return (
        <div
          key={row[0]}
          index={rowidx}
          style={{ order: this.props.rowOrder[rowidx] }}
          className="collable-row"
          onMouseEnter={this.state.userSelect && this.state.rowSelected && (rowidx != this.state.rowSelected) ? (e) => { this.handeMouseEnterRow(e) } : null}>
          {row.map((cell, idx) => {
            return (
              <div
                key={rowidx.toString() + '-' + idx.toString()}
                index={rowidx}
                style={(this.state.userSelect && (this.state.columnSelected == idx)) || (this.state.userSelect && (this.state.rowSelected == rowidx)) ?
                  { order: this.props.colOrder[idx], ...cellStyle } : { order: this.props.colOrder[idx] }}
                className={this.state.userSelect && (this.state.columnSelected == idx || this.state.rowSelected == rowidx) ? 'selected' : ''}
                onMouseDown={idx == 0 ? this.handleMouseDownRow : null}>
                <p>{cell}</p>
              </div>)
          })}
        </div>)
    })

    return (
      <div
        className={"collable" + (this.state.userSelect ? " noselect" : "")}
        style={{ width: this.props.colOrder.length * 300 }}>
        {tableheaders}
        {tablerows}
      </div>
    )
  }
}

export default Table