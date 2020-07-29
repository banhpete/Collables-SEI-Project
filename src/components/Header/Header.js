import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <div className="Header-container">
      <Link to="/"><h1>Collables</h1></Link>
      <div className="nav">
        {props.username ?
          <>
            <Link to="/createtable">Create New Table</Link>
            <Link to="/tables">See Tables</Link>
            <a href='#' onClick={props.handleLogout}>Log Out</a>
          </> :
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </>}
      </div>
    </div>
  )
}

export default Header