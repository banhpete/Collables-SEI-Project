import React from 'react';
import './App.css';
import SignUpPage from '../SignUpPage/SignUpPage'
import LoginPage from '../LoginPage/LoginPage'
import { Route, Link, Switch } from 'react-router-dom'
import { getUser, logOut } from '../../utils/userServices'

class App extends React.Component {
  state = {
    username: getUser()
  }

  handleLogout = () => {
    logOut();
    this.setState({
      username: null
    })
  }

  handleSignupOrLogin = () => {
    this.setState({
      username: getUser()
    })
  }

  render() {
    return (
      <div className='App'>
        <h1>Hello! Welcome To Collables</h1>
        {this.state.username ?
          <div><h2>Hi {this.state.username}</h2><button onClick={this.handleLogout}>Log out</button></div> :
          <div><Link to="/signup">Sign Up</Link> <Link to="/login">Log In</Link></div>
        }
        <Switch>
          <Route exact path="/signup" render={(props) => {
            return (
              <SignUpPage {...props} handleSignupOrLogin={this.handleSignupOrLogin} />
            )
          }} />
          <Route exact path="/login" render={(props) => {
            return (
              <LoginPage {...props} />
            )
          }} />
        </Switch>
      </div>
    )
  }
}

export default App;
