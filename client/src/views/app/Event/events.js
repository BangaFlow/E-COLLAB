import React, { Component, Fragment } from "react"
import { Row, Button } from "reactstrap"
import { Colxx, Separator } from "../../../components/common/CustomBootstrap"
import Breadcrumb from "../../../containers/navs/Breadcrumb"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import * as eventAction from "../../../redux/actions/eventActions"
import { bindActionCreators } from "redux"
import Event from "../../../components/Calendar/event"

import AddNewModal from "../../../components/Calendar/AddNewModal"

export class Calendar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      modalOpen: false,
    }
  }
  componentDidMount() {
    this.props.actions.getAllEvent().catch((e) => {
      alert(e)
    })
  }
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    })
  }

  render() {
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <Breadcrumb heading="Events" match={this.props.match} />
            <div className="float-sm-right">
              <Button color="primary" size="lg" onClick={this.toggleModal}>
                Add Event
              </Button>
            </div>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Colxx>
          <Row>
            {this.props.event.map((event) => (
              <Event key={event.id} event={event} />
            ))}
          </Row>
        </Colxx>

        <AddNewModal
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal}
        />
      </Fragment>
    )
  }
}
Calendar.propType = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    event: state.event,
  }
}

function mapDispatchtoProps(dispatch) {
  return { actions: bindActionCreators(eventAction, dispatch) }
}
export default connect(mapStateToProps, mapDispatchtoProps)(Calendar)
