import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "react-select";
import swal from "sweetalert";
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
import * as skillsActions from "../../redux/actions/skills.actions";

class SkillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      description: "",
      type: "",
    };
  }

  addNetItem = () => {
    let label = this.state.label;
    let description = this.state.description;
    let type = this.state.type.value;
    this.props.actions
      .addSkill(label, description, type)
      .then(
        swal("NEW SKILL ADDED!", "A new skill has been added successfuly", "success")
      )
      .catch((err) => {
        console.log(err);
      });

    this.props.toggleModal();
    this.setState({
      label: "",
      description: "",
      type: "",
    });
  };

  render() {
    const categories = ["Technical skill", "Soft skill"];
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
          <Label className="mt-4">Label</Label>
          <Input
            type="text"
            defaultValue={this.state.label}
            onChange={(event) => {
              this.setState({ label: event.target.value });
            }}
          />
          <Label className="mt-4">Description</Label>
          <Input
            type="textarea"
            defaultValue={this.state.description}
            onChange={(event) => {
              this.setState({ description: event.target.value });
            }}
          />

          <Label className="mt-4">Type</Label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={categories.map((x, i) => {
              return { label: x, value: x, key: i };
            })}
            value={this.state.type}
            onChange={(val) => {
              this.setState({ type: val });
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

const mapStateToProps = (state, ownProps) => ({ skill: state.skill });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(skillsActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillForm);
