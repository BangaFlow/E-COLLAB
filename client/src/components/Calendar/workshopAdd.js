import React, { Component } from "react";

import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox,
} from "availity-reactstrap-validation";
import {
  Button, Label, Card, CardBody, Input, Modal, CardTitle,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import * as workShopAction from "../../redux/actions/workShopActions"
import { bindActionCreators } from "redux"

class workshopAdd extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      workShopName: "",
      workShop_Requirments: "",
      workShop_startTime: "",
      workShop_endTime: "",
      workShop_goals: "",
      workShop_Certification: "",
      workShop_description: ""





    }



  }

  handleSubmit(event, errors, values) {

    let workShopName = this.state.workShopName
    let workShop_Requirments = this.state.workShop_Requirments
    let workShop_startTime = this.state.workShop_startTime
    let workShop_endTime = this.state.workShop_endTime
    let workShop_goals = this.state.workShop_goals
    let workShop_Certification = this.state.workShop_Certification
    let workShop_description = this.state.workShop_description
    this.props.actions.addWorkShop(workShopName, workShop_description, workShop_Requirments, workShop_Certification, workShop_startTime, workShop_endTime, workShop_goals).catch((err) => {
      console.log(err);
    });

    this.setState({
      workShopName: "",
      workShop_Requirments: "",
      workShop_startTime: "",
      workShop_endTime: "",
      workShop_goals: "",
      workShop_Certification: "",
      workShop_description: ""





    })


  }

  render() {
    return (
      

          <AvForm
            className="av-tooltip tooltip-label-right"
            onSubmit={this.handleSubmit}
          >
            <AvGroup>
              <Label>Name</Label>
              <AvInput name="workShopName" required onChange={(event) => {
                this.setState({ workShopName: event.target.value });
              }} />
              <AvFeedback>Name is required!</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label>Goals</Label>
              <AvInput required name="workShop_goals" onChange={(event) => {
                this.setState({ workShop_goals: event.target.value });
              }} />
              <AvFeedback>This is an error!</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label>Requirement</Label>
              <AvInput name="workShop_Requirments" required onChange={(event) => {
                this.setState({ workShop_Requirments: event.target.value });
              }} />
              <AvFeedback>This is an error!</AvFeedback>
            </AvGroup>


            <AvGroup>
              <Label>Description</Label>
              <AvInput type="textarea" name="workShop_description" id="details" required onChange={(event) => {
                this.setState({ workShop_description: event.target.value });
              }} />
              <AvFeedback>Please enter some details!</AvFeedback>
            </AvGroup>

            <Label >Start Time </Label>




            <Input onChange={(event) => {
              this.setState({ workShop_startTime: event.target.value });
            }}
              type="date"
              name="workShop_startTime"
              id="exampleDate"
              placeholder="date placeholder"
            />

            <Label >End Time</Label>




            <Input onChange={(event) => {
              this.setState({ workShop_endTime: event.target.value });
            }}
              type="date"
              name="workShop_endTime"
              id="exampleDate"
              placeholder="date placeholder"
            />

            <AvRadioGroup
              className="error-l-150"
              inline
              name="checkboxCustomInputExample2"
              required
            >
              <Label className="d-block">Certification</Label>
              <AvRadio customInput label="Yes" name="workShop_Certification" value="true" onChange={(event) => {
                this.setState({ workShopName: event.target.value });
              }} />
              <AvRadio customInput label="No" name="workShop_Certification" checked value="false" onChange={(event) => {
                this.setState({ workShop_Certification: event.target.value });
              }} />
            </AvRadioGroup>
            <Button color="primary">ADD</Button>
          </AvForm>
        

      

    );
  }
}


workshopAdd.propType = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  
  return {
    workShop: state.workShop
  }


};

function mapDispatchtoProps(dispatch) {
  return { actions: bindActionCreators(workShopAction, dispatch) }
}
export default connect(mapStateToProps, mapDispatchtoProps)(workshopAdd);
