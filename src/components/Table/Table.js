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
    rowOrder: this.getOrder(this.props.data),
    colOrder: this.getOrder(this.props.data[0]),
    userSelect: false,
    columnSelected: null,
    rowSelected: null,
    user_x: 0,
    user_y: 0,
    offset_x: 0,
    offset_y: 0,
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
        user_y: e.y - this.state.offset_y,
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
    let arrCopy = [...this.state.colOrder]
    arrCopy = arrCopy.map((col, idx) => {
      if (idx === selectedCol) return this.state.colOrder[shiftingCol]
      if (this.state.colOrder[selectedCol] < this.state.colOrder[shiftingCol]) {
        if (this.state.colOrder[idx] > this.state.colOrder[selectedCol] && this.state.colOrder[idx] <= this.state.colOrder[shiftingCol]) {
          return --arrCopy[idx]
        } else {
          return arrCopy[idx]
        }
      } else {
        if (this.state.colOrder[idx] < this.state.colOrder[selectedCol] && this.state.colOrder[idx] >= this.state.colOrder[shiftingCol]) {
          return ++arrCopy[idx]
        } else {
          return arrCopy[idx]
        }
      }
    })
    this.setState({
      colOrder: arrCopy
    })
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
        user_x: e.x - this.state.offset_x,
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

  // Handle Column Swap
  handeMouseEnterRow = (e) => {
    var rect = e.target.getBoundingClientRect();
    this.setState({
      offset_x: rect.left,
      offset_y: rect.top,
    })
    let selectedRow = parseInt(this.state.rowSelected)
    let shiftingRow = parseInt(e.target.getAttribute('index'))
    let arrCopy = [...this.state.rowOrder]
    arrCopy = arrCopy.map((row, idx) => {
      if (idx === selectedRow) return this.state.rowOrder[shiftingRow]
      if (this.state.rowOrder[selectedRow] < this.state.rowOrder[shiftingRow]) {
        if (this.state.rowOrder[idx] > this.state.rowOrder[selectedRow] && this.state.rowOrder[idx] <= this.state.rowOrder[shiftingRow]) {
          return --row
        } else {
          return row
        }
      } else {
        if (this.state.rowOrder[idx] < this.state.rowOrder[selectedRow] && this.state.rowOrder[idx] >= this.state.rowOrder[shiftingRow]) {
          return ++row
        } else {
          return row
        }
      }
    })
    this.setState({
      rowOrder: arrCopy
    })
  }

  render() {
    let cellStyle = {
      transform: `translate(${this.state.user_x}px, ${this.state.user_y}px)`
    }

    let tableheaders = <div key="header" className="collable-row">{this.props.data[0].map((header, idx) => {
      if (!header) return <div key="empty"></div>
      return (
        <div
          key={header}
          index={idx}
          style={(this.state.columnSelected == idx ? { order: this.state.colOrder[idx], ...cellStyle } : { order: this.state.colOrder[idx] })}
          className={this.state.userSelect && (this.state.columnSelected == idx) ? 'selected' : ''}
          onMouseDown={this.handleMouseDownCol}
          onMouseEnter={this.state.userSelect && (idx != this.state.columnSelected) ? (e) => { this.handeMouseEnterCol(e) } : null}>
          {header}
        </div>)
    })
    }</div>

    let tablerows = this.props.data.map((row, rowidx) => {
      if (rowidx === 0) return null
      return (
        <div
          key={row[0]}
          index={rowidx}
          className="collable-row"
          style={{ order: this.state.rowOrder[rowidx] }}
          onMouseEnter={this.state.userSelect && (rowidx != this.state.rowSelected) ? (e) => { this.handeMouseEnterRow(e) } : null}>
          {row.map((cell, idx) => {
            return (
              <div
                key={cell}
                index={rowidx}
                style={(this.state.userSelect && (this.state.columnSelected == idx)) || (this.state.userSelect && (this.state.rowSelected == rowidx)) ?
                  { order: this.state.colOrder[idx], ...cellStyle } : { order: this.state.colOrder[idx] }}
                className={this.state.userSelect && (this.state.columnSelected == idx || this.state.rowSelected == rowidx) ? 'selected' : ''}
                onMouseDown={idx == 0 ? this.handleMouseDownRow : null}>
                {cell}
              </div>)
          })}
        </div>)
    })

    return (
      <div className={"collable" + (this.state.userSelect ? " noselect" : "")}>
        {tableheaders}
        {tablerows}
      </div>
    )
  }
}

export default Table