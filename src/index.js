import React from 'react';
import ReactDOM from 'react-dom';
import { Connector } from 'mqtt-react';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Connector mqttProps="ws://broker.mqttdashboard.com:8000">
    <App />
  </Connector>,
  document.getElementById('root')
);

registerServiceWorker();

/*<Connector mqttProps="mqtt://broker.mqttdashboard.com">*/
