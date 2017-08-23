import React from 'react';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-gl2d';
import EventEmitter from 'eventemitter3';
import PubSub from 'pubsub-js';

const PlotlyComponent = createPlotlyComponent(Plotly);

class Plot2DLinesBasicRandom extends React.Component {

  constructor(props) {
    super(props);

    //reference to object for callbacks
    var that = this;

    this.state = {
      topic:            props.topic,
      range_x:          props.range_x,
      range_y:          props.range_y,
      line_color:       props.line_color,
      data_points_show: props.data_points_show,
      sensors:          props.sensors,
      trace1: {
        /*x: [1, 2, 3, 4],*/
        y: [],
        type: 'scatter',
      },
      trace2: {
        /*x: [1, 2, 3, 4],*/
        y: [],
        type: 'scatter'
      },
      trace3: {
        /*x: [1, 2, 3, 4],*/
        y: [],
        type: 'scatter'
      },
      trace4: {
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

      setInterval(function(){
        var next_state = that.state;
        next_state.trace1.y.push(Math.random() * (10-8) + 8);
        next_state.trace2.y.push(Math.random() * (6-5) + 5);
        next_state.trace3.y.push(Math.random() * (4-2) + 2);
        next_state.trace4.y.push(Math.random() * (9-5) + 3);

        //prune state to selected show range
        if(next_state.trace1.y.length > that.state.data_points_show){
          //console.log(next_state.trace1.y.length);
          next_state.trace1.y = next_state.trace1.y.slice(-that.state.data_points_show);
        }
        if(next_state.trace2.y.length > that.state.data_points_show){
          next_state.trace2.y = next_state.trace2.y.slice(-that.state.data_points_show);
        }
        if(next_state.trace3.y.length > that.state.data_points_show){
          next_state.trace3.y = next_state.trace3.y.slice(-that.state.data_points_show);
        }
        if(next_state.trace4.y.length > that.state.data_points_show){
          next_state.trace4.y = next_state.trace4.y.slice(-that.state.data_points_show);
        }

        that.setState(next_state);

      }, 100);
    }

    this.updateComponent();


  }


  componentDidMount() {
    console.log("mounted Plot2DLinesBasicRandom"); //tell us it mounted
    //PubSub.subscribe( this.state.topic, this.receiveNewData );
  };

  render() {
    //let traces =  this.state.traces;
    let traces =  [this.state.trace1, this.state.trace2, this.state.trace3, this.state.trace4];
    let layout = this.state.layout;

    return (
      <div>
        <PlotlyComponent
          data={traces}
          layout = {layout}
          config={this.state.config}
        />
      </div>
    );

  }
};

export default Plot2DLinesBasicRandom;
