// @ts-nocheck
import React from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import IntlMessages from "../../helpers/IntlMessages";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import * as eventAction from "../../redux/actions/eventActions"
import { bindActionCreators } from "redux"


class UpdateModal extends React.Component  {
  constructor(props) {
    super(props);
   
    this.state={
      eventName: this.props.currentEvent.eventName,
      description: "",
      eventType: "",
      date:""
    };
  }

      save= (event)=>{
        event.preventDefault();
      let eventName = this.state.eventName
      let description= this.state.description
      let eventType= this.state.eventType
      let date=this.state.date
      this.props.actions.updateEvent(this.props.currentEvent.id,eventName).catch((err) => {
        console.log(err);
      });
  
      this.props.toggleModal();
      this.setState({
       eventName: "",
      description: "",
      eventType: "",
      date:""
      });

    };
    render(){
  return (
    <Modal
      isOpen={this.props.modalOpen}
      toggle={this.props.toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={this.props.toggleModal}>
        <IntlMessages id="Update EVENT" />
      </ModalHeader>
      <ModalBody>
        <Label>

          <IntlMessages id="Event Name" />
        </Label>
        {console.log()}
        <Input defaultValue={this.state.eventName}
        onChange={(event) => {
          this.setState({ eventName: event.target.value }); 
        }}/>



        <Label className="mt-4">
          <IntlMessages id="Event Type" />
          
        </Label>
        <Input /> 
        <Label className="mt-4">
          <IntlMessages id=" Description" />
        </Label>
        <Input type="textarea" name="text" id="exampleText" />
        <Label className="mt-4">
          <IntlMessages id=" Date" />
        </Label>
        <div className="form-group has-float-label">
        <DatePicker />
        <IntlMessages id="date" />
      </div>


        
        
        
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={this.props.toggleModal}>
          <IntlMessages id="cancel" />
        </Button>
        <Button color="primary" onClick={this.save}>
          <IntlMessages id="submit" />
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
      }
};
UpdateModal.propType = {
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
export default connect(mapStateToProps, mapDispatchtoProps)(UpdateModal);

