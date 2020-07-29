import React from 'react'
import "./AuthPages.css"
import { logIn } from '../../utils/userServices'

// Utils

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    errMsg: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    logIn(this.state)
      .then(() => {
        this.props.handleSignupOrLogin();
        this.props.history.push('/')
      })
      .catch(() => {
        this.setState({
          errMsg: "Invalid Credentials - Try Again"
        })
      })
  }

  render() {
    let errMsg = this.state.errMsg ? <p>{this.state.errMsg}</p> : null
    return (
      <div className="Auth-Page-Container">
        <form className="Auth-Page-Form" onSubmit={this.handleSubmit}>
          <h2>Login Page</h2>
          {errMsg}
          <div className="Auth-Page-Formrow">
            <label htmlFor="username">Username</label>
            <input name="username" id="username" type="text" onChange={this.handleChange}></input>
          </div>
          <div className="Auth-Page-Formrow">
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" onChange={this.handleChange}></input>
          </div>
          <input className="btn" type="submit" value="Login"></input>
        </form>
      </div>
    )
  }
}

export default LoginPage