import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <h1>Hello! Welcome To Collables</h1>
        <button onClick={() => {
          fetch('./api/test').then((data) => { console.log(data); return data.json() }).then((data) => console.log(data))
        }}>Testing API</button>
        <form method="post" action="./api/test2">
          <input name="message" type="text"></input>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

export default App;
