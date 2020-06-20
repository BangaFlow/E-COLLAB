import React from "react";
import {
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

import { AvForm, AvField ,AvRadioGroup,AvRadio } from 'availity-reactstrap-validation';



class AddNewModal extends React.Component  {
  constructor(props) {
    super(props);
    this.state={
      eventName: "",
      description: "",
      eventType: "",
      date:"",
      place:"",
      eventOrganizer: "",
    
     
    };
  }

      save= ()=>{
      let eventName = this.state.eventName
      let description= this.state.description
      let eventType= this.state.eventType
      let date=this.state.date
      let place =this.state.place
      let eventOrganizer =this.state.eventOrganizer
      
      this.props.actions.addEvent(eventName,eventType, description, date,eventOrganizer,place).catch((err) => {
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
     
      backdrop="static"
    >
      <ModalHeader toggle={this.props.toggleModal}>
        <IntlMessages id=" EVENT"  />
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
AddNewModal.propType = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  
  return {
    events: state.event
  }


};

function mapDispatchtoProps(dispatch) {
  return { actions: bindActionCreators(eventAction, dispatch) }
}
export default connect(mapStateToProps, mapDispatchtoProps)(AddNewModal);

