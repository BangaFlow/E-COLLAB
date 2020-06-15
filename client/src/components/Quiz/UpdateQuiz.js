import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormText,
  Label,
  CardTitle
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import IntlMessages from "../../helpers/IntlMessages";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import * as quizAction from "../../redux/actions/quiz.actions"
import { bindActionCreators } from "redux"
import { AvForm, AvField ,AvRadioGroup,AvRadio } from 'availity-reactstrap-validation';


class UpdateQuiz extends React.Component  {
  constructor(props) {
    super(props);
    this.state={
        question: props.question.question,
        optionA: props.question.optionA,
        optionB: props.question.optionB,
        optionC: props.question.optionC,
        optionD: props.question.optionD,
        answer: props.question.answer,
        note:props.question.note,
        id: props.question.id
    };
  }

      save= (event)=>{
        

        event.preventDefault();

        this.props.actions.updatequestion(this.state.id,this.state.question,this.state.optionA,this.state.optionB,this.state.optionC,this.state.optionD,parseInt(this.state.note),this.state.answer).catch((err) => {
            console.log(err);
            })

          
       
          this.setState(prevstate => ({
            question: '',
            optionA : '',
            optionB : '',
            optionC :'',
            optionD : '',
            answer  : '',
            note    : '',
        
        }))

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
        
        
        <AvForm  id="form" onSubmit={this.save}>
        <AvField name="question" label="Question" type="text"  onChange={(event) => {
          this.setState({ question: event.target.value}); 
        }}  value={this.state.question} 
        
        errorMessage="the question is required" validate={{
            required: {value: true}} 
          
        } />
        <AvField name="optionA" label="optionA"   onChange={(event) => {
          this.setState({ optionA: event.target.value}); 
        }}
         type="text" value={this.state.optionA} 
        
        validate={{
            required: {value: true, errorMessage: 'the first option is requirded'},
            
          }} />

          <AvField name="optionB" label="optionB" type="text"
          onChange={(event) => {
            this.setState({ optionB: event.target.value}); 
          }}
          value={this.state.optionB} validate={{
            required: {value: true, errorMessage: ' you need to fill 2 options at least'},
            
          }} />
          
          <AvField name="optionC"  onChange={(event) => {
            this.setState({ optionC: event.target.value}); 
          }} label="optionC"  value={this.state.optionC} type="text" />

          <AvField name="optionD" label="optionD" type="text" onChange={(event) => {
            this.setState({ optionD : event.target.value}); 
          }} value={this.state.optionD}/>

          <AvRadioGroup inline name="answer" label="Select the correct answer " 
          
          value={this.state.answer} validate={{required: {value: true, errorMessage: ' choose the right answer'}}} >
          <AvRadio label="optionA"   onChange={(event) => {
            this.setState({ answer : event.target.value}); 
          }} value="optionA" />
          <AvRadio label="optionB"  onChange={(event) => {
            this.setState({ answer : event.target.value}); 
          }} value="optionB" />
          <AvRadio label="optionC"   onChange={(event) => {
            this.setState({ answer : event.target.value}); 
          }} value="optionC" />
          <AvRadio label="optionD"   onChange={(event) => {
            this.setState({ answer : event.target.value}); 
          }} value="optionD" />
        </AvRadioGroup>

        <AvField name="note" onChange={(event) => {
          this.setState({ note : event.target.value}); 
        }} label="points" type="number" value={this.state.note} />
        <FormText color="muted">Please choose wisely</FormText>
        <CardTitle>
        </CardTitle>
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
UpdateQuiz.propType = {
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
export default connect(mapStateToProps, mapDispatchtoProps)(UpdateQuiz);

