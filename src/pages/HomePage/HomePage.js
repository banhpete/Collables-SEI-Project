import React from 'react'
import "./HomePage.css"
import { Link } from 'react-router-dom'

function HomePage(props) {
  let buttons = null
  if (!props.username) {
    buttons = (
      <>
        <Link className="btn">Log In</Link>
        <Link className="btn">Sign up</Link>
      </>
    )
  } else {
    buttons = (
      <>
        <Link className="btn">Create New Table</Link>
        <Link className="btn">See Tables</Link>
      </>
    )
  }

  return (
    <div className="Home-Page-Container">
      <div className="Home-Page-Main">
        <h2>Info about why you should use Collables</h2>
        <p><strong>Collables saved my life</strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation <strong>I love Collables</strong> ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat <strong>Collables is the best</strong> non proident, sunt in culpa qui officia deserunt mollit anim id.</p>
        <div className="btn-container">
          {buttons}
        </div>
      </div>
    </div>
  )
}

export default HomePage