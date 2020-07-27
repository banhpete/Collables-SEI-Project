import React from 'react'

// Utils

class LoginPage extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>Login Page</h1>
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