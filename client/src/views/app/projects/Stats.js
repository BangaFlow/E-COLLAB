import React, { Component, Fragment } from "react";
import { Bar as BarChart } from 'react-chartjs-2';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CategoriesActions from "../../../redux/actions/categories.actions";
import { Row, Button } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import $ from 'jquery';


class Stats extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalOpen: false,
      
    };
  }
  
  componentDidMount() {
    
     this.props.actions.loadtypeProjects().catch((err) => {
      alert(`error ${err}`);
    });
    
    let categories=[];
    let ps=[];
    let count=0;
    let i=0;
    console.log(this.props.location.c);
    
    this.props.location.c.forEach(element => {
      categories[i]=element.title;
      element.Projects.map((number) =>
      <li key={number.id}>
        {count=count+1}
      </li>
    );
      ps[i]=count;
      count=0;
      i=i+1;
      console.log(count);
    });

    console.log(categories);
    console.log(ps);
      //let label=['categories','hhh'];
      //let data=[20,80];
      let label=categories;
      let data=ps;

      let color=['#49A9EA','#36CAAB','#800080','#FF00FF']
      let myChart= document.getElementById("myChart");
      let chart= new Chart(myChart, {
            type: 'doughnut',
            data: {
            labels: label,
            datasets: [{
            data: data,
            backgroundColor: color
      }]
    },
    options: {
      title:{
        text: "projects per category",
        display: true
      }
    }
  });
  }

  statistics =() =>{
    let categories=[];
    let ps=[];
    let count=0;
    let i=0;
    console.log(this.props.categories);
    
    this.props.categories.forEach(element => {
      categories[i]=element.title;
      element.Projects.map((number) =>
      <li key={number.id}>
        {count=count+1}
      </li>
    );
      ps[i]=count;
      i=i+1;
      console.log(count);
    });

    console.log(categories);
    console.log(ps);

    
    
  };
 

render(){

  return (

    <Fragment>
            
            <Row>
              <Colxx xxs="12">
                <h1>Statistics</h1>
                <Separator className="mb-5" />
              </Colxx>
            </Row>
           
            <Row>
              <Colxx xxs="12" className="mb-4">
              <canvas id="myChart" width="100" height="50"></canvas>
              </Colxx>  
              
          
             
            

                
            </Row>

        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
          </Fragment>

         


  );
  }
}

const mapStateToProps = (state, ownProps) => ({ categories: state.categories });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(CategoriesActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);




/*




    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>






import React from "react";
import ChartComponent, { Chart } from "react-chartjs-2";

import { polarAreaChartOptions } from "./config";

export default class stats extends React.Component 
{
   constructor(props) {
    super(props);
    if (this.props.shadow) {
      Chart.defaults.polarWithShadow = Chart.defaults.polarArea;
      Chart.controllers.polarWithShadow = Chart.controllers.polarArea.extend({
        draw: function(ease) {
          Chart.controllers.radar.prototype.draw.call(this, ease);
          let ctx = this.chart.chart.ctx;
          ctx.save();
          ctx.shadowColor = "rgba(0,0,0,0.2)";
          ctx.shadowBlur = 7;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 7;
          ctx.responsive = true;
          Chart.controllers.radar.prototype.draw.apply(this, arguments);
          ctx.restore();
        }
      });
    }
  }

  render() {
    const { data,shadow } = this.props;
    return (
      <ChartComponent
        ref={ref => (this.chart_instance = ref && ref.chart_instance)}
        type={shadow?"polarWithShadow":"polarArea"}
        options={{
          ...polarAreaChartOptions
        }}
        data={data}
      />
    );
  }
}
*/