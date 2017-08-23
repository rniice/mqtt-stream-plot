import React, { Component } from 'react';
import Plot2DLinesBasic from './Plot2DLinesBasic';
import MQTTListener from './MQTTListener';
import { Button } from 'react-bootstrap';
import PubSub from 'pubsub-js';

import './App.css';

//test using http://mitsuruog.github.io/what-mqtt/

class App extends Component {
  constructor(props) {
    super(props);

    //reference to object for callbacks
    var that = this;

  };

  /*
  componentDidMount() {
    console.log("mounted App"); //tell us it mounted
    this.on("test", console.log("received test event"));

  };
  */

  render() {

    return (
      <div className="App">

        <Button bsStyle="success" bsSize="small" onClick={function(){console.log("button clicked");} }>
          Test Button
        </Button>

        <MQTTListener
          host={'ws://scottydb.vcs.rd.hpicorp.net:8083'}
          topic={'/Transporter/Live/Dataq/UA74A11014/Status/Data'}
          device={'dataq_1'}
          sensors={['a1','a2','a3','a4','a5','a6','a7','a8']}
        />

        <Plot2DLinesBasic
          topic="/Transporter/Live/Dataq/UA74A11014/Status/Data"
          range_x={[0,300]}
          range_y={[0,10]}
          line_color={'#FF0'}
          data_points_show={300}
        />

      </div>
    );
  };

  loadData(data){
    console.log("loading data: " + data);
  };

  transferData(data){
    console.log("transferring data: " + data);
  };

/*
  sendData(data){
    console.log("sending data: " + data);
  };

  receiveData(data){
    console.log("received data: " + data);
  };
*/

}

export default App;
