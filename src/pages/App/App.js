import React from 'react';
import './App.css';
import SignUpPage from '../SignUpPage/SignUpPage'
import LoginPage from '../LoginPage/LoginPage'
import TablePage from '../TablePage/TablePage'
import { Route, Link, Switch } from 'react-router-dom'
import { getUser, logOut } from '../../utils/userServices'

class App extends React.Component {
  state = {
    username: getUser(),
    data: [
      [null, 'header 1', 'header 2', 'header 3', 'header 4'],
      ['row 1', 'info on row 1-header 1', 'info on row 1-header 2', 'info on row 1-header 3', 'info on row 1-header 4'],
      ['row 2', 'info on row 2-header 1', 'info on row 2-header 2', 'info on row 2-header 3', 'info on row 2-header 4'],
      ['row 3', 'info on row 3-header 1', 'info on row 3-header 2', 'info on row 3-header 3', 'info on row 3-header 4'],
      ['row 4', 'info on row 4-header 1', 'info on row 4-header 2', 'info on row 4-header 3', 'info on row 4-header 4'],
    ]
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
        <header className='App-header'>
          <h1>Collables</h1>
          {this.state.username ?
            <><p>Hi {this.state.username}</p><button onClick={this.handleLogout}>Log out</button></> :
            <><Link to="/signup">Sign Up</Link> <Link to="/login">Log In</Link></>
          }
        </header>
        <Switch>
          <Route exact path="/signup" render={(props) => {
            return (
              <SignUpPage {...props} handleSignupOrLogin={this.handleSignupOrLogin} />
            )
          }} />
          <Route exact path="/login" render={(props) => {
            return (
              <LoginPage {...props} handleSignupOrLogin={this.handleSignupOrLogin} />
            )
          }} />
          <Route path="/" render={(props) => {
            return (
              <TablePage data={this.state.data} />
            )
          }} />
        </Switch>
      </div>
    )
  }
}

export default App;
