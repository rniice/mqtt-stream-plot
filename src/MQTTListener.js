import React from 'react';
import MQTT from 'mqtt';
import EventEmitter from 'eventemitter3';

class MQTTListener extends React.Component {
//const Plot2DLinesBasic = ({ results }) => {
  constructor(props) {
    super(props);
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
      this.subscribe("woot");
    });

    this.client.on('message', function(topic, message){
      //console.log(message.toString());
      that.setState({message: message.toString()});
    });

  }

  render() {

    return (
      <div>
        <p>Broker is: {this.state.broker} </p>
        <p>Topic is: {this.state.topic} </p>
        <p>Message is: {this.state.message} </p>
      </div>
    );
  }
};

export default MQTTListener;
