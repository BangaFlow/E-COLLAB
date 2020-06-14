import React, { Component } from "react";
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

import CustomSelectInput from "../../components/common/CustomSelectInput";
import * as projectActions from "../../redux/actions/Projects.actions";
import * as CategoriesActions from "../../redux/actions/categories.actions";

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     title: "",
     school_year:"",
     class_involved:"",
     number_of_teams:"",
     number_of_members:"",
     number_of_tutors_per_team:""
      
    };
  }

  addNetItem = () => {
    let title = this.state.title;
    let school_year= this.state.school_year;
    let class_involved= this.state.class_involved.value;
    let number_of_teams= this.state.number_of_teams;
    let number_of_members= this.state.number_of_members;
    let number_of_tutors_per_team= this.state.number_of_tutors_per_team;
    let id=this.props.id;
    console.log(this.props.id);
    this.props.actions.addproject(id,title,school_year,class_involved,number_of_teams,number_of_members,number_of_tutors_per_team).catch((err) => {
      console.log(err);
    });

    this.props.toggleModal();
    this.setState({
      title: "",
      school_year:"",
     class_involved:"",
     number_of_teams:"",
     number_of_members:"",
     number_of_tutors_per_team:""
    });
  };

  render() {
    const classes = ["second year", "third year", "forth year"];
    const { modalOpen, toggleModal } = this.props;  

    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>{this.props.title}</ModalHeader>
        <ModalBody>
          <Label className="mt-4">Title</Label>
          
          <Input
            type="text"
            defaultValue={this.state.title}
            onChange={(event) => {
              this.setState({ title: event.target.value });
            }}
            validate={{
              required: {
                value: true,
                errorMessage: "Please enter a title",
              },
            }}
          />
           <Label className="mt-4">School year</Label>
          <Input
            type="text"
            defaultValue={this.state.school_year}
            onChange={(event) => {
              this.setState({ school_year: event.target.value });
            }}
            validate={{
              required: {
                value: true,
                errorMessage: "Please enter a school year",
              },
            }}
          />

          <Label className="mt-4">class involved</Label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={classes.map((x, i) => {
              return { label: x, value: x, key: i };
            })}
            value={this.state.class_involved}
            onChange={(val) => {              
              this.setState({ class_involved: val });
            }}
            validate={{
              required: {
                value: true,
                errorMessage: "Please select a class",
              },
            }}
          />



           <Label className="mt-4">number of teams</Label>
          <Input
            type="text"
            defaultValue={this.state.number_of_teams}
            onChange={(event) => {
              this.setState({ number_of_teams: event.target.value });
            }}
            validate={{
              number: {
                value: true,
                errorMessage: "Value must be a number",
              },
              required: {
                value: true,
                errorMessage: "Please enter number of teams",
              },
            }}
          />
             <Label className="mt-4">number of members per team</Label>
          <Input
            type="text"
            defaultValue={this.state.number_of_members}
            onChange={(event) => {
              this.setState({ number_of_members: event.target.value });
            }}
            validate={{
              number: {
                value: true,
                errorMessage: "Value must be a number",
              },
              required: {
                value: true,
                errorMessage: "Please enter number of members per team",
              },
            }}
          />

          <Label className="mt-4">number of tutors per team</Label>
          <Input
            type="text"
            defaultValue={this.state.number_of_tutors_per_team}
            onChange={(event) => {
              this.setState({ number_of_tutors_per_team: event.target.value });
            }}
            validate={{
              number: {
                value: true,
                errorMessage: "Value must be a number",
              },
              required: {
                value: true,
                errorMessage: "Please enter number of tutors per team",
              },
            }}
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

const mapStateToProps = (state, ownProps) => ({ category: state.category});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(CategoriesActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);