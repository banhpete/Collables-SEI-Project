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
    tableName: "",
    tableID: null,
    tableData: [[]],
    rowOrder: [],
    colOrder: [],
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

  getOrder = (arr) => {
    console.log('getOrder', arr)
    let numOfRows = arr.length;
    console.log(numOfRows)
    let order = [];
    for (let i = 0; i < numOfRows; i++) {
      order.push(i)
    }
    return order
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
      tableData: [[]],
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
      tableName: data.tableName,
      tableID: data.tableID,
      tableData: data.tableData,
      userTables: userTablesCopy,
      recentTables: data.recentTables,
      rowOrder: this.getOrder(data.tableData),
      colOrder: this.getOrder(data.tableData[0])
    }, () => this.props.history.push('/table/' + this.state.tableID))
  }

  setTableData = (data) => {
    console.log(data)
    let tableData = JSON.parse(data.tableData)
    this.setState({
      tableName: data.tableName,
      tableID: data._id,
      tableData: tableData,
      rowOrder: this.getOrder(tableData),
      colOrder: this.getOrder(tableData[0])
    }, () => this.props.history.push('/table/' + this.state.tableID))
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
                <TablesPage {...props} userTables={this.state.userTables} recentTables={this.state.recentTables} sharedTables={this.state.sharedTables} setTableData={this.setTableData} /> :
                <Redirect to={{
                  pathname: '/login',
                  state: { errMsg: "Try logging in first maybe..." }
                }} />
            )
          }} />
          <Route exact path="/table/:tableID" render={(props) => {
            return (
              getUser() ?
                <TablePage {...props} data={this.state.tableData} setTableData={this.setTableData} tableName={this.state.tableName} colOrder={this.state.colOrder} rowOrder={this.state.rowOrder} /> :
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
