import React, { Component } from 'react';
import Plot2DLinesBasic from './Plot2DLinesBasic';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

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
