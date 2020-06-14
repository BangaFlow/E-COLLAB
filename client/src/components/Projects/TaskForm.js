import React, { Component,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "react-select";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import * as subjectActions from "../../redux/actions/subjects.actions";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
        start_date:"",
        end_date:"",
        description:"",
        goal:""
    
      
    };
  }
     
  addNetItem = () => {
    let start_date=this.state.start_date;
    let end_date = this.state.end_date;
    let description= this.state.description;
    let goal= this.state.goal;

    //let id= {item.id};
    let id=this.props.id;
    console.log(this.props.id);
    this.props.actions.addtask(id,start_date,
        end_date,
        description,
        goal).catch((err) => {
      console.log(err);
    });

    this.props.toggleModal();
    this.setState({
        start_date:"",
        end_date:"",
        description:"",
        goal:""
    
    });
  };

  render() {
    //const classes = ["second year", "third year", "forth year"];
    const { modalOpen, toggleModal } = this.props;
    //const [selectedDate, setSelectedDate]=useState(null)  

    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>{this.props.title}</ModalHeader>
        <ModalBody>
        <Label className="mt-4">Description</Label>
          <Input
            type="text"
            defaultValue={this.state.description}
            onChange={(event) => {
              this.setState({ description: event.target.value });
            }}
            validate={{
              required: {
                value: true,
                errorMessage: "Please enter a Description",
              },
              minLength: {
                value: 10,
                errorMessage:
                  "Location must be between 10 and 150 characters",
              },
              maxLength: {
                value: 150,
                errorMessage:
                  "Location must be between 10 and 150 characters",
              },
            }}
          />
             <Label className="mt-4">Goal</Label>
          <Input
            type="text"
            defaultValue={this.state.goal}
            onChange={(event) => {
              this.setState({ goal: event.target.value });
            }}
            validate={{
              required: {
                value: true,
                errorMessage: "Please enter a Goal",
              },
            }}
          />

          
        <Label className="mt-4">Start Date</Label>
      <DatePicker
      selected={this.state.start_date} 
      onChange={date => {
        this.setState({ start_date: date });
      }}
      
      minDate={new Date}
        />

            <Label className="mt-4">End Date</Label>
      <DatePicker
      selected={this.state.end_date} 
      onChange={date => {
        this.setState({ end_date: date });
      }}
      
      minDate={new Date}
        />

        


             


        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => this.addNetItem()}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ subject: state.subject});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(subjectActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);