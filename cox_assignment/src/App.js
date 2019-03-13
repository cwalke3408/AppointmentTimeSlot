import React, { Component } from 'react';
import './App.css';
import AppointmentView from './view/AppointmentView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppointmentView />
      </div>
    );
  }
}

export default App;
