import React from 'react';
import MQTT from 'mqtt';
import { Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PubSub from 'pubsub-js';

class MQTTListener extends React.Component {

  constructor(props) {

    super(props);

    //reference to object for callbacks
    var that = this;


    this.state = {
      host:             props.host,
      topic:            props.topic,
      device:           props.device,
      sensors:          props.sensors,
      message:          null
    };

    // create a function to subscribe to topics
    this.sendNewData = function (msg, data) {
        console.log("from MQTT Listener: " + data );
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
    });

  }

  componentDidMount() {
    console.log("mounted MQTTListener"); //tell us it mounted
    PubSub.subscribe( this.state.topic, this.sendNewData );
    //this.on("test", console.log("received test event"));
  };

  render() {

    var data_header = [ { host: this.state.host, topic: this.state.topic } ];
    var data_sensors_json = JSON.parse(this.state.message);

    var data_sensors = [];
    //console.log(data_sensors_json);

    if(data_sensors_json){
      for (var i = 0; i < this.state.sensors.length; i++) {
        data_sensors.push(
          {device: this.state.device, sensor: this.state.sensors[i], value: data_sensors_json[this.state.device][this.state.sensors[i]] } );
      }
      PubSub.publish( this.state.topic, data_sensors );        // publish a topic asyncronously
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
            <TableHeaderColumn dataField='device' isKey={ true }>Device</TableHeaderColumn>
            <TableHeaderColumn dataField='sensor' editable={ false }>Sensor</TableHeaderColumn>
            <TableHeaderColumn dataField='value'>Value</TableHeaderColumn>
        </BootstrapTable>
      </div>

    );
  }
};

export default MQTTListener;
