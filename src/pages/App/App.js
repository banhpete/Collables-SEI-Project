import React from 'react';
import './App.css';
import SignUpPage from '../AuthPages/SignUpPage'
import LoginPage from '../AuthPages/LoginPage'
import TablesPage from '../TablesPage/TablesPage'
import TablePage from '../TablePage/TablePage'
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
      [null, 'What do you like about your current website? Please be as detailed as possible.', 'What functions does your website need to have to be valuable to you and your business? They do not need to currently be on your website.2', 'How do you plan to use your website to grow your business moving forward? This will help your mentor(s) identify features that might be useful for your site.2', 'header 4', 'Do you currently have any of the following branding assets for your business? Check all that apply.', "I’m looking for my web design and development mentors to:"],
      ['row 1', 'info on row 1-header 1', 'I like the format of the home page on desktop and the simplicity of navigating throughout the different pages.', 'info on row 1-header 3', 'info on row 1-header 4', 'info on row 1-header 5', 'info on row 1-header 5'],
      ['row 2', 'info on row 2-header 1', 'info on row 2-header 2', 'info on row 2-header 3', 'info on row 2-header 4', 'info on row 2-header 5', 'info on row 1-header 5'],
      ['row 3', '-Individuals can see the services that are available in the clinic -Be higher ranking on google so individuals know the clinic exists -Drive more people to website and in the outcome get more people to come to clinic', 'info on row 3-header 2', 'info on row 3-header 3', 'info on row 3-header 4', 'info on row 3-header 5', 'info on row 1-header 5'],
      ['row 4', 'info on row 4-header 1', 'info on row 4-header 2', 'I like that is describes the services we provides.', "Improvements would involve customizing cover photo zoom in as there is only 2 settings so if the photo isn't the right size it is too close up most of the time. A more cohesive feel throughout the site that has a branded touch that stands out I find is missing. Many of the elements are basic and also when converting the desktop view to mobile (which is where most people will view from) the mobile is even more generic and could be improved with more formatting flexibility. Improvements can also be made to the product page to showcase different aspects of each product in a branded way.", 'info on row 4-header 5', 'info on row 1-header 5'],
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
        [null, 'What do you like about your current website? Please be as detailed as possible.', 'How do you plan to use your website to grow your business moving forward? This will help your mentor(s) identify features that might be useful for your site.', 'How do you plan to use your website to grow your business moving forward? This will help your mentor(s) identify features that might be useful for your site.2', 'header 4'],
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
          <Route exact path="/tables" render={(props) => {
            return (
              getUser() ?
                <TablesPage {...props} userTables={this.state.userTables} recentTables={this.state.recentTables} sharedTables={this.state.sharedTables} /> :
                <Redirect to={{
                  pathname: '/login',
                  state: { errMsg: "Try logging in first maybe..." }
                }} />
            )
          }} />
          <Route exact path="/table/:tableID" render={(props) => {
            return (
              getUser() ?
                <TablePage {...props} data={this.state.tableData} /> :
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
