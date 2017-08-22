import React, { Component } from 'react';
import EventEmitter from 'eventemitter3';
import Plot2DLinesBasic from './Plot2DLinesBasic';
import MQTTListener from './MQTTListener';
import { Button, BootstrapTable, TableHeaderColumn } from 'react-bootstrap';

import './App.css';

//test using http://mitsuruog.github.io/what-mqtt/

class App extends Component {
  render() {
    return (
      <div className="App">

        <Button bsStyle="success" bsSize="small" onClick={function(){console.log("button clicked");} }>
          Test Button
        </Button>

        <MQTTListener
          host={'ws://scottydb.vcs.rd.hpicorp.net:8083'}
          topic={'/Transporter/Live/vulcanbb1xm002/Status/Data'}
        />

        <Plot2DLinesBasic
          mqtt_topic="/Transporter/Powdersol"
          range_x={[0,300]}
          range_y={[0,10]}
          line_color={'#FF0'}
          data_points_show={300}
        />

      </div>
    );
  }
}

export default App;
