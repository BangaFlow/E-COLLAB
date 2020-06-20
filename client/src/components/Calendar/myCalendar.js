import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import * as eventAction from "../../redux/actions/eventActions"
import { bindActionCreators } from "redux"

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class myCalendar extends Component {
  state = {
    events: [
      {
        start: moment().format("2020/04/29"),
        end: moment()
          .format("2020/04/29")
          ,
        title: "event7"
      },
      {
        start: moment().format("2020/04/1"),
        end: moment()
          .format("2020/04/1")
          ,
        title: "event7"
      },

      {
        start: moment().format("2020/04/12"),
        end: moment()
          .format("2020/04/12")
          ,
        title: "event7"
      },
      
      {
        start: moment().format("2020/05/1"),
        end: moment()
          .format("2020/05/1")
          ,
        title: "event1"
      }
    ]
  };

  componentDidMount() {
    this.props.actions.getAllUserEvent("5e7a78dd3b0ae706707f8098").catch(e => {
      alert(e)
    })
  }

  render() {
   
    return (
     
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
        />
        {
          
            console.log(this.props.event)
        }
        
      
      </div>

    );
  }
}
myCalendar.propType = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  
  return {
    event: state.event.events
  }


};
function mapDispatchtoProps(dispatch) {
  return { actions: bindActionCreators(eventAction, dispatch) }
}
export default connect(mapStateToProps, mapDispatchtoProps) (myCalendar);
