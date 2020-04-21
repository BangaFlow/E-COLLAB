import React, { Component, Fragment } from "react";
import { Row, Button } from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import * as eventAction from "../../../redux/actions/eventActions"
import { bindActionCreators } from "redux"
import Event from "../../../components/Calendar/event"
import AddNewModal from "./AddNewModal";



export class Calendar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalOpen: false
    }
  }
  componentDidMount() {
    this.props.actions.getAllEvent().catch(e => {
      alert(e)
    })
  }
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };
  render() {


    return (
      <Fragment>





        <AddNewModal
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal}

        />

        <Row>
          <div className="mb-2">

            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={() => this.toggleModal()}
            ></Button></div>

          <Colxx xxs="12">
            <Breadcrumb heading="Events" match={this.props.match} />

            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>

          <p><IntlMessages id="Calendar" /></p>
          <Separator className="mb-5" />
          <br></br>
          <Row>
            {


              this.props.event.map(event => (

                <Event key={event.id} event={event} />

              ))}

          </Row>







        </Row>
      </Fragment>
    )
  }
}
Calendar.propType = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  debugger
  return {
    event: state.event
  }


};

function mapDispatchtoProps(dispatch) {
  return { actions: bindActionCreators(eventAction, dispatch) }
}
export default connect(mapStateToProps, mapDispatchtoProps)(Calendar);