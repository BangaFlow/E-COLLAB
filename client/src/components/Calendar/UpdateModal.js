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
import { AvForm, AvField ,AvRadioGroup,AvRadio } from 'availity-reactstrap-validation';
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
      description: this.props.currentEvent.description,
      eventType: this.props.currentEvent.eventType,
      date:this.props.currentEvent.date,
      place:this.props.currentEvent.place,
      eventOrganizer: this.props.currentEvent.eventOrganizer,
    };
  }

      save= (event)=>{
        event.preventDefault();
        let eventName = this.state.eventName
        let description= this.state.description
        let eventType= this.state.eventType
        let date=this.state.date
        let place =this.state.place
        let eventOrganizer =this.state.eventOrganizer
        console.log("the event"+this.props.currentEvent.id,eventName,eventType, description, date,eventOrganizer,place)
              this.props.actions.updateEvent(this.props.currentEvent.id,eventName,eventType, description, date,eventOrganizer,place).catch((err) => {
        console.log(err);
      });
  
      this.props.toggleModal();
      this.setState({
        eventName: "",
        description: "",
        eventType: "",
        date:"",
        place:"",
        eventOrganizer: "",
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
        
      <AvForm  id="form" onSubmit={this.save}>      

      <AvField  label="Event Name" name="eventName" defaultValue={this.state.eventName}
      onChange={(event) => {
        this.setState({ eventName: event.target.value}); 
      }}        validate={{
        required: {value: true, errorMessage: 'the name is required'}}} />

        <AvField  label="Organizer" name="eventOrganizer" defaultValue={this.state.eventOrganizer}
        onChange={(event) => {
          this.setState({ eventOrganizer: event.target.value}); 
        }}        validate={{
          required: {value: true, errorMessage: 'the Organizer is required'}}} />



       <AvField  label="Description" type="textarea" name="description" defaultValue={this.state.description}
      onChange={(event) => {
        this.setState({ description: event.target.value}); 
      }}        validate={{
        required: {value: true, errorMessage: 'the description is required'}}} /> 


        <Label >Type</Label>
        <Input type="select" name="eventType" defaultValue={this.state.eventType}
        onChange={(event) => {
          this.setState({ eventType: event.target.value}); 
        }}        validate={{
          required: {value: true, errorMessage: 'the eventType is required'}}}
        >
        <option>Event</option>
        <option>WorkShop</option>
        <option>Forum</option>
        <option>Compition</option>
        <option>Hackathon</option>
        <option>otheres</option>
      </Input>

      <Label >Date</Label>

      
     

      <Input onChange={(event) => {
        this.setState({ date: event.target.value}); 
      }}    
      type="date"
      name="date"
      id="exampleDate" 
      placeholder="date placeholder"
    />
   
      
      <AvField  label="Place" type="text" name="place" defaultValue={this.state.place}
      onChange={(event) => {
        this.setState({ place: event.target.value}); 
      }}        validate={{
        required: {value: true, errorMessage: 'the palce is required'}}} /> 


      <Button color="primary" type="submit">
          <IntlMessages id="submit" />
        </Button>{" "}

        </AvForm>













      </ModalBody>
      
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

