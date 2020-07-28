import React from 'react'
import './Table.css';

class Table extends React.Component {
  state = {
    userSelect: false,
    columnSelected: null,
    rowSelected: null,
    x: 0,
    y: 0,
  }

  // Handle Column Being Dragged
  handleMouseDownCol = (e) => {
    var offsetY = e.target.offsetTop
    var offsetX = e.target.offsetLeft
    this.setState({
      userSelect: true,
      columnSelected: e.target.getAttribute('index')
    })

    // Event Handler Functions
    const updatePosition = (e) => {
      this.setState({
        x: e.x - offsetX + 5,
        y: e.y - offsetY,
      })
    }

    const removeMovement = () => {
      this.setState({
        userSelect: false,
        x: 0,
        y: 0,
      })
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseup', removeMovement)
    }

    // Event Hanlder Added to Window to handle Dragging
    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseup', removeMovement)
  }

  // Handle Column Swap
  handleMouseUpCol = (e) => {
    /* The state becomes null immediately when the mouse is lifted due to the function above. Therefore to avoid any errors, 
    we save that variable to a temporary variable */
    this.props.handleColSwap(parseInt(this.state.columnSelected), parseInt(e.target.getAttribute('index')))
  }

  render() {
    let cellStyle = {
      transform: `translate(${this.state.x}px, ${this.state.y}px)`
    }

    let tableheaders = <div className="collable-row">{this.props.data[0].map((header, idx) => {
      if (!header) return <div></div>
      return (
        <div
          index={idx}
          style={this.state.columnSelected == idx ? cellStyle : {}}
          className={this.state.userSelect && (this.state.columnSelected == idx) ? 'selected' : ''}
          onMouseDown={this.handleMouseDownCol}
          onMouseUp={this.state.columnSelected && (idx != this.state.columnSelected) ? (e) => { this.handleMouseUpCol(e) } : () => { }}>
          {header}
        </div>)
    })
    }</div >

    let tablerows = this.props.data.map((row, idx) => {
      if (idx === 0) return null
      return (<div className="collable-row">{row.map((cell, idx) => { return (<div style={this.state.userSelect && (this.state.columnSelected == idx) ? cellStyle : {}} className={this.state.userSelect && (this.state.columnSelected == idx) ? 'selected' : ''} >{cell}</div>) })}</div>)
    })

    return (
      <div className={"collable" + (this.state.columnSelected ? " noselect" : "")}>
        {tableheaders}
        {tablerows}
      </div>
    )
  }
}

export default Table