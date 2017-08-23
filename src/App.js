import React, { Component } from 'react';
import EventEmitter from 'eventemitter3';
import Plot2DLinesBasic from './Plot2DLinesBasic';
import MQTTListener from './MQTTListener';
import { Button } from 'react-bootstrap';

import util from 'util';

import './App.css';

//test using http://mitsuruog.github.io/what-mqtt/

class App extends Component {
  constructor(props) {
    super(props);

    EventEmitter.call(this);       //inherit the EventEmitter Constructor

    //inherit the EventEmitter Prototype Methods
    util.inherits(App, EventEmitter);

    //reference to object for callbacks
    var that = this;


    /*
    //initiate the event emitter
    this.eventEmitter = new EventEmitter();

    this.on = function(eventName, listener) {
       that.eventEmitter.on(eventName, listener);
    };

    this.emit = function(event, payload, error = false) {
      //console.log("emitting event");
      that.eventEmitter.emit(event, payload, error);
    };

    this.getEventEmitter = function() {
      return that.eventEmitter;
    };
    */
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
          topic={'/Transporter/Live/vulcanbb1xm002/Status/Data'}
          transferData={this.transferData.bind(this)}
        />

        <Plot2DLinesBasic
          topic="/Transporter/Live/vulcanbb1xm002/Status/Data"
          range_x={[0,300]}
          range_y={[0,10]}
          line_color={'#FF0'}
          data_points_show={300}
          transferData={this.transferData.bind(this)}
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
