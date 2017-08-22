import React from 'react';
import MQTT from 'mqtt';
import { Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import EventEmitter from 'eventemitter3';

class MQTTListener extends React.Component {

  constructor(props) {

    super(props);

    //initiate the event emitter
    this.eventEmitter = new EventEmitter();

    this.state = {
      host:             props.host,
      topic:            props.topic,
      message:          ""
    };

    this.client         = MQTT.connect(this.state.host);

    //reference to object for callbacks
    var that = this;

    this.client.on('connect', function(){
      //this is within the client scope
      console.log("connection established: " + that.state.host);
      //loop through and subscribe to all topics in array this.topic
      this.subscribe(that.state.topic);
    });

    this.client.on('message', function(topic, message){
      //console.log("topic: " + topic.toString() + "message: " + message.toString());
      that.setState({message: message.toString()});
    });

  }

  render() {

    var data = [{ host: this.state.host, topic: this.state.topic, message: this.state.message }];

    const tableStyle = {
      margin: "0 auto",
      width: "80%"
    };

    const cellEditProp = {
      mode: 'click'
    };

    return (
      <div>
        <BootstrapTable data={ data } cellEdit={ cellEditProp } insertRow={ true } style={ tableStyle }>
            <TableHeaderColumn dataField='host' isKey={ true }>Broker</TableHeaderColumn>
            <TableHeaderColumn dataField='topic' editable={ false }>Topic</TableHeaderColumn>
            <TableHeaderColumn dataField='message'>Message</TableHeaderColumn>
        </BootstrapTable>
      </div>

    );
  }
};

export default MQTTListener;
