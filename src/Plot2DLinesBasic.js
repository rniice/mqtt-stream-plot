import React from 'react';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-gl2d';
import { subscribe } from 'mqtt-react';
//https://www.npmjs.com/package/mqtt-react

const PlotlyComponent = createPlotlyComponent(Plotly);

class Plot2DLinesBasic extends React.Component {
//const Plot2DLinesBasic = ({ results }) => {
  constructor(props) {
    super(props);
    this.state = {
      mqtt_topic:   props.mqtt_topic,
      range_x:      props.range_x,
      range_y:      props.range_y,
      line_color:   props.line_color,
      trace1: {
        /*x: [1, 2, 3, 4],*/
        y: [],
        type: 'scatter'
      },
      trace2: {
        /*x: [1, 2, 3, 4],*/
        y: [],
        type: 'scatter'
      },
      config: null
    };


    this.updateComponent = function (){
      var that = this;
      setInterval(function(){
        var next_state = that.state;
        next_state.trace1.y.push(Math.floor(Math.random() * (10-5)) + 5);
        next_state.trace2.y.push(Math.floor(Math.random() * (10-5)) + 5);
        that.setState(next_state);
      }, 2000);
    }

    this.updateComponent();

  }

  render() {
    let data_plot =  [this.state.trace1, this.state.trace2];

    // Messages are passed on the "data" prop
    const MessageList = (props) => (
      <ul>
        {props.data.map( message => <li>{message}</li> )}
      </ul>
    );

    // simple subscription to messages on the "@test/demo" topic
    subscribe({
      topic: '@demo/test'
    })(MessageList);

    return (
      <div>
        <p>Plot MQTT Topic is: {this.state.mqtt_topic} </p>
        <p>Plot RangeX is: {this.state.range_x.toString()} </p>
        <p>Plot RangeY is: {this.state.range_y.toString()} </p>
        <p>Plot Stroke Color is: {this.state.line_color} </p>

        <PlotlyComponent
          data={data_plot}
          //data={[this.state.trace1, this.state.trace2]}
          config={this.state.config}
        />
      </div>
    );
  }
};

export default Plot2DLinesBasic;
