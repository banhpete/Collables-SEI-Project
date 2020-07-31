import React from 'react';
import './App.css';
import SignUpPage from '../AuthPages/SignUpPage'
import LoginPage from '../AuthPages/LoginPage'
import TablesPage from '../TablesPage/TablesPage'
import CreateTablePage from '../CreateTablePage/CreateTablePage'
import HomePage from '../HomePage/HomePage'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Route, Switch, Redirect } from 'react-router-dom'
import { getUserData, logOut, getUser } from '../../utils/userServices'

class App extends React.Component {
  state = {
    username: getUser(),
    userTables: [],
    recentTables: [],
    sharedTables: [],
    tableID: null,
    tableData: [
      [null, 'header 1', 'header 2', 'header 3', 'header 4'],
      ['row 1', 'info on row 1-header 1', 'info on row 1-header 2', 'info on row 1-header 3', 'info on row 1-header 4'],
      ['row 2', 'info on row 2-header 1', 'info on row 2-header 2', 'info on row 2-header 3', 'info on row 2-header 4'],
      ['row 3', 'info on row 3-header 1', 'info on row 3-header 2', 'info on row 3-header 3', 'info on row 3-header 4'],
      ['row 4', 'info on row 4-header 1', 'info on row 4-header 2', 'info on row 4-header 3', 'info on row 4-header 4'],
    ],
  }

  componentDidMount = () => {
    if (getUser()) {
      getUserData()
        .then((userData) => {
          if (userData.errMsg) return;
          return this.setState({
            userTables: userData.userTables,
            recentTables: userData.recentTables,
            sharedTables: userData.sharedTables,
          })
        })
    } else {
      return;
    }
  }

  handleLogout = (e) => {
    e.preventDefault();
    logOut();
    this.setState({
      username: "",
      userTables: [],
      recentTables: [],
      sharedTables: [],
      tableID: null,
      tableData: [
        [null, 'header 1', 'header 2', 'header 3', 'header 4'],
        ['row 1', 'info on row 1-header 1', 'info on row 1-header 2', 'info on row 1-header 3', 'info on row 1-header 4'],
        ['row 2', 'info on row 2-header 1', 'info on row 2-header 2', 'info on row 2-header 3', 'info on row 2-header 4'],
        ['row 3', 'info on row 3-header 1', 'info on row 3-header 2', 'info on row 3-header 3', 'info on row 3-header 4'],
        ['row 4', 'info on row 4-header 1', 'info on row 4-header 2', 'info on row 4-header 3', 'info on row 4-header 4'],
      ],
    }, () => {
      return this.props.history.push('/')
    })
  }

  handleSignupOrLogin = () => {
    let username = getUser()
    getUserData()
      .then((userData) => {
        return this.setState({
          username: username,
          userTables: userData.userTables,
          recentTables: userData.recentTables,
          sharedTables: userData.sharedTables,
        })
      })
  }

  createTableUpdate = (data) => {
    let userTablesCopy = [...this.state.userTables]
    userTablesCopy.push({ _id: data.tableID, tableName: data.tableName })
    this.setState({
      tableID: data.tableID,
      tableData: data.tableData,
      userTables: userTablesCopy,
      recentTables: data.recentTables
    })
  }

  render() {
    return (
      <div className='App'>
        <Header username={this.state.username} handleLogout={this.handleLogout}></Header>
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
          <Route path="/tables" render={(props) => {
            return (
              getUser() ?
                <TablesPage userTables={this.state.userTables} recentTables={this.state.userTables} sharedTables={this.state.sharedTables} /> :
                <Redirect to={{
                  pathname: '/login',
                  state: { errMsg: "Try logging in first maybe..." }
                }} />
            )
          }} />
          <Route path="/createtable" render={(props) => {
            return (
              getUser() ?
                <CreateTablePage {...props} createTableUpdate={this.createTableUpdate} /> :
                <Redirect to={{
                  pathname: '/login',
                  state: { errMsg: "Try logging in first maybe..." }
                }} />
            )
          }} />
          <Route path="/" render={(props) => (

            <HomePage username={this.state.username} />
          )} />
        </Switch>
        <Footer></Footer>
      </div>
    )
  }
}

export default App;
