import React, { Component } from 'react';
import Plot2DLinesBasic from './Plot2DLinesBasic';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        */}
        {/*
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        */}

        <Plot2DLinesBasic
          mqtt_topic="/Transporter/Powdersol"
          range_x={[0,100]}
          range_y={[0,6]}
          line_color={'#F00'}
        />
        <Plot2DLinesBasic
          mqtt_topic="/Transporter/Powdersol"
          range_x={[0,100]}
          range_y={[0,6]}
          line_color={'#F00'}
        />
        <Plot2DLinesBasic
          mqtt_topic="/Transporter/Powdersol"
          range_x={[0,100]}
          range_y={[0,6]}
          line_color={'#F00'}
        />
        <Plot2DLinesBasic
          mqtt_topic="/Transporter/Powdersol"
          range_x={[0,100]}
          range_y={[0,6]}
          line_color={'#F00'}
        />
        <Plot2DLinesBasic
          mqtt_topic="/Transporter/Powdersol"
          range_x={[0,100]}
          range_y={[0,6]}
          line_color={'#F00'}
        />
        <Plot2DLinesBasic
          mqtt_topic="/Transporter/Powdersol"
          range_x={[0,100]}
          range_y={[0,6]}
          line_color={'#F00'}
        />

      </div>
    );
  }
}

export default App;
