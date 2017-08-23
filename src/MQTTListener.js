import React from 'react';
import MQTT from 'mqtt';
import _ from 'lodash';

import { Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import EventEmitter from 'eventemitter3';

class MQTTListener extends React.Component {

  constructor(props) {

    super(props);
    this.transferData = this.props.transferData;


    //reference to object for callbacks
    var that = this;

    //initiate the event emitter
    this.eventEmitter = new EventEmitter();

    this.on = function(eventName, listener) {
       that.eventEmitter.on(eventName, listener);
    };

    this.emit = function(event, payload, error = false) {
      //console.log("emitting event: " + event);
      that.eventEmitter.emit(event, payload, error);
    };

    this.getEventEmitter = function() {
      return that.eventEmitter;
    };

    this.state = {
      host:             props.host,
      topic:            props.topic,
      message:          null
    };

    this.client         = MQTT.connect(this.state.host);

    this.client.on('connect', function(){
      //this is within the client scope
      console.log("connection established: " + that.state.host);
      //loop through and subscribe to all topics in array this.topic
      this.subscribe(that.state.topic);
    });

    this.client.on('message', function(topic, message){
      that.setState({message: message.toString()});
      //emit the event out for new data
      //that.emit("test", message.toString());
      that.transferData(message.toString());
    });

  }

  render() {

    var data_header = [ { host: this.state.host, topic: this.state.topic } ];
    var data_sensors_json = JSON.parse(this.state.message);
    var data_sensors = null;
    //console.log(data_sensors_json);

    if(data_sensors_json){
      data_sensors = [
        {sensor: 'HT1', temp: data_sensors_json['HT1'].temp, hum: data_sensors_json['HT1'].hum},
        {sensor: 'HT2', temp: data_sensors_json['HT2'].temp, hum: data_sensors_json['HT2'].hum},
        {sensor: 'HT3', temp: data_sensors_json['HT3'].temp, hum: data_sensors_json['HT3'].hum},
        {sensor: 'HT4', temp: data_sensors_json['HT4'].temp, hum: data_sensors_json['HT4'].hum}
      ];
    }

    const tableStyle = {
      margin: "0 auto",
      width: "80%"
    };

    const cellEditProp = {
      mode: 'click'
    };

    return (
      <div>
        <BootstrapTable width={ 300 } data={ data_header } cellEdit={ cellEditProp } insertRow={ false } style={ tableStyle }>
            <TableHeaderColumn dataField='host' isKey={ true }>Broker</TableHeaderColumn>
            <TableHeaderColumn dataField='topic' editable={ false }>Topic</TableHeaderColumn>
        </BootstrapTable>

        <BootstrapTable width={ 300 } data={ data_sensors } cellEdit={ cellEditProp } insertRow={ false } style={ tableStyle }>
            <TableHeaderColumn dataField='sensor' isKey={ true }>Sensor</TableHeaderColumn>
            <TableHeaderColumn dataField='temp' editable={ false }>Temp [degC]</TableHeaderColumn>
            <TableHeaderColumn dataField='hum'>Humidity</TableHeaderColumn>
        </BootstrapTable>

      </div>

    );
  }
};

export default MQTTListener;
