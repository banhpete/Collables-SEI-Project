import React from 'react';
import { Link } from 'react-router-dom';

// Utils
import { signUp } from '../../utils/userServices'

class SignUpPage extends React.Component {
  state = {
    username: "",
    email: "",
    emailConf: "",
    password: "",
    passwordConf: "",
    errMsg: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    signUp(this.state)
      .then(() => {
        this.props.handleSignupOrLogin();
        this.props.history.push('/')
      })
      .catch(() => {
        this.setState({ errMsg: "There was something wrong! Try Again" })
      })
  }

  isFormInvalid() {
    return !(this.state.username && this.state.email && this.state.password && this.state.password === this.state.passwordConf && this.state.email === this.state.emailConf);
  }

  render() {
    let errMsg = this.state.errMsg ? <p>{this.state.errMsg}</p> : null
    return (
      <div className="Auth-Page-Container">
        <form className="Auth-Page-Form" onSubmit={this.handleSubmit}>
          <h2>Sign Up Page</h2>
          {errMsg}
          <div className="Auth-Page-Formrow">
            <label htmlFor="username">Username</label>
            <input name="username" id="username" type="text" onChange={this.handleChange}></input>
          </div>
          <div className="Auth-Page-Formrow">
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="text" onChange={this.handleChange}></input>
          </div>
          <div className="Auth-Page-Formrow">
            <label htmlFor="emailConf">Confirm Your Email</label>
            <input name="emailConf" id="emailConf" type="text" onChange={this.handleChange}></input>
          </div>
          <div className="Auth-Page-Formrow">
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" onChange={this.handleChange}></input>
          </div>
          <div className="Auth-Page-Formrow">
            <label htmlFor="passwordConf">Password</label>
            <input name="passwordConf" id="passwordConf" type="password" onChange={this.handleChange}></input>
          </div>
          <input className="btn" type="submit" value="Sign Up" disabled={this.isFormInvalid()}></input>
          <Link className="btn" to="/">Cancel Sign up</Link>
        </form>
      </div>
    )
  }
}

export default SignUpPage