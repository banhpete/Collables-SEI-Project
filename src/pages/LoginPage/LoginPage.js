import React from 'react'
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
      <div>
        <h1>Login Page</h1>
        {errMsg}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input name="username" id="username" type="text" onChange={this.handleChange}></input>
          <label htmlFor="password">Password</label>
          <input name="password" id="password" type="password" onChange={this.handleChange}></input>
          <input type="submit" value="Login"></input>
        </form>
      </div>
    )
  }
}

export default LoginPage