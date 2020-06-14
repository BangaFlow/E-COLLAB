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
import * as CategoriesActions from "../../redux/actions/categories.actions";
import CustomSelectInput from "../common/CustomSelectInput";


class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     title: "",
     description:"",
     methodology:""
      
    };
  }

  addNetItem = () => {
    let title = this.state.title;
    let description= this.state.description;
    let methodology= this.state.methodology.value;
    
   
    this.props.actions.addCategory(title, description,methodology).catch((err) => {
      console.log(err);
    });

    this.props.toggleModal();
    this.setState({
      title: "",
     description:"",
     methodology:""
    });
  };

  render() {
    const meths = ["RAD", "SCRUM"];
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
          />
           <Label className="mt-4">Description</Label>
          <Input
            type="text"
            defaultValue={this.state.description}
            onChange={(event) => {
              this.setState({ description: event.target.value });
            }}
          />

          <Label className="mt-4">methodology</Label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={meths.map((x, i) => {
              return { label: x, value: x, key: i };
            })}
            value={this.state.methodology}
            onChange={(val) => {              
              this.setState({ methodology: val });
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);