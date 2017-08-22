import React from 'react';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-gl2d';
//https://www.npmjs.com/package/mqtt-react

const PlotlyComponent = createPlotlyComponent(Plotly);

class Plot2DLinesBasic extends React.Component {
//const Plot2DLinesBasic = ({ results }) => {
  constructor(props) {
    super(props);
    this.state = {
      mqtt_topic:       props.mqtt_topic,
      range_x:          props.range_x,
      range_y:          props.range_y,
      line_color:       props.line_color,
      data_points_show: props.data_points_show,
      trace1: {
        /*x: [1, 2, 3, 4],*/
        y: [],
        type: 'scatter',
        mode: "line",
        name: 'woot',
        line: {
          color: "rgba(100, 0, 0, 0.6)",
          sizemin: 0.2,
          sizemax: 0.5
        }
      },
      trace2: {
        /*x: [1, 2, 3, 4],*/
        y: [],
        type: 'scatter'
      },
      layout: {
        xaxis: {range: [props.range_x[0], props.range_x[1]] /*, autorange: true */},
        yaxis: {range: [props.range_y[0], props.range_y[1]] /*, autorange: true */}
      },
      config: null
    };


    this.updateComponent = function (){
      var that = this;
      setInterval(function(){
        var next_state = that.state;
        next_state.trace1.y.push(Math.random() * (10-8) + 8);
        next_state.trace2.y.push(Math.random() * (6-5) + 5);

        //prune state to selected show range
        if(next_state.trace1.y.length > that.state.data_points_show){
          //console.log(next_state.trace1.y.length);
          next_state.trace1.y = next_state.trace1.y.slice(-that.state.data_points_show);
        }
        if(next_state.trace2.y.length > that.state.data_points_show){
          next_state.trace2.y = next_state.trace2.y.slice(-that.state.data_points_show);
        }

        that.setState(next_state);
      }, 20);
    }

    this.updateComponent();

  }

  render() {
    let data_plot =  [this.state.trace1, this.state.trace2];
    let layout = this.state.layout;

    return (
      <div>
        <p>Plot MQTT Topic is: {this.state.mqtt_topic} </p>
        <p>Plot RangeX is: {this.state.range_x.toString()} </p>
        <p>Plot RangeY is: {this.state.range_y.toString()} </p>
        <p>Plot Stroke Color is: {this.state.line_color} </p>

        <PlotlyComponent
          data={data_plot}
          layout = {layout}
          config={this.state.config}
        />
      </div>
    );
  }
};

export default Plot2DLinesBasic;
