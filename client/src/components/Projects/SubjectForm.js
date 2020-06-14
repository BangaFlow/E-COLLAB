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
import * as subjectActions from "../../redux/actions/subjects.actions";

class SubjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     title: "",
     description:""
      
    };
  }
     
  addNetItem = () => {
    let title = this.state.title;
    let description= this.state.description;
    //let id= {item.id};
    let id=this.props.id;
    console.log(this.props.id);
    this.props.actions.addsubject(id,title,description).catch((err) => {
      console.log(err);
    });

    this.props.toggleModal();
    this.setState({
      title: "",
      description:""
    });
  };

  render() {
    //const classes = ["second year", "third year", "forth year"];
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

const mapStateToProps = (state, ownProps) => ({ subject: state.subject});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(subjectActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectForm);