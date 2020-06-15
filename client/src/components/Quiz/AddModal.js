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
import * as quizAction from "../../redux/actions/quiz.actions"
import { bindActionCreators } from "redux"
import { AvForm, AvField ,AvRadioGroup,AvRadio } from 'availity-reactstrap-validation';


class AddModal extends React.Component  {
  constructor(props) {
    super(props);
    this.state={
      labl: "",
      time: "",
    };
  }

      save= (event)=>{
        event.preventDefault();
      let label = this.state.label
      let time= this.state.time
      this.props.actions.addquiz(this.state.label, parseInt(this.state.time)).catch((err) => {
        console.log(err);
      })
        console.log("quia"+this.props.quiz)
      
      this.setState({
       label: "",
       time: "",
      
      });

      this.props.toggleModal();
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
        <IntlMessages id="ADD Quiz" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="Add Quiz" />
        </Label>
        
        <AvForm  id="form" onSubmit={this.save}>      

        <AvField  label="Question" name="label" defaultValue={this.state.label}
        onChange={(event) => {
          this.setState({ label: event.target.value}); 
        }}        validate={{
          required: {value: true, errorMessage: 'the Question is required'}}} />



        <AvField label="Time" name="time" type="number" placeholder="by minutes"  min="5" defaultValue={this.state.time}
        onChange={(event) => {
          this.setState({ time: event.target.value}); 
        }}          validate={{
          required: {value: true, errorMessage: 'the time is required in minutes'}}} />
        
          </AvForm>


      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={this.props.toggleModal}>
          <IntlMessages id="cancel" />
        </Button>
        <Button color="primary" type="submit"  onClick={this.save}>
          <IntlMessages id="submit" />
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
      }
};
AddModal.propType = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  debugger
  return {
    quiz: state.quiz
  }


};

function mapDispatchtoProps(dispatch) {
  return { actions: bindActionCreators(quizAction, dispatch) }
}
export default connect(mapStateToProps, mapDispatchtoProps)(AddModal);

