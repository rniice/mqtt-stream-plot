import React from 'react';
import { subscribe } from 'mqtt-react';
//https://www.npmjs.com/package/mqtt-react


class TestMQTTComponent extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = {

    };

  } */

  render() {

    // Messages are passed on the "data" prop
    const MessageList = function(props){
      return (
        <ul>
          {/*{props.data.map( message => <li>{message}</li> )}*/}
        </ul>
      );
    };

    // simple subscription to messages on the "@test/demo" topic
    subscribe({
      topic: 'wtk'
    })(MessageList);

    return (
      <div>
        <MessageList />
      </div>
    );
  }
};

export default TestMQTTComponent;
