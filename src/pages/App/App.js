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
import { getUser, logOut } from '../../utils/userServices'

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

  handleLogout = (e) => {
    e.preventDefault();
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

  updateTableData = (newTableData) => {
    this.setState({
      tableData: newTableData
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
              <TablesPage />
            )
          }} />
          <Route path="/createtable" render={(props) => {
            return (
              getUser() ?
                <CreateTablePage {...props} updateTableData={this.updateTableData} /> :
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
