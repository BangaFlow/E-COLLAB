import React from "react";
import { Button, Modal, ModalHeader, ModalBody, Label } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import IntlMessages from "../../helpers/IntlMessages";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as quizAction from "../../redux/actions/quiz.actions";
import { bindActionCreators } from "redux";
import { AvForm, AvField } from "availity-reactstrap-validation";
import getSkillFetch from "../Quiz/fetchSkills";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import Select from "react-select";
class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labl: "",
      time: "",
      skills: [],
      idskill: {},
    };
  }

  componentDidMount() {
    getSkillFetch().then((data) => this.setState({ skills: data.getSkills }));
  }

  save = (event) => {
    event.preventDefault();
    this.props.actions
      .addquiz(
        this.state.label,
        parseInt(this.state.time),
        this.state.idskill.key
      )
      .catch((err) => {
        console.log(err);
      });
    console.log("quia" + this.props.quiz);

    this.setState({
      label: "",
      time: "",
    });

    this.props.toggleModal();
  };
  render() {
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

          <AvForm id="form" onSubmit={this.save}>
            <AvField
              label="Question"
              name="label"
              defaultValue={this.state.label}
              onChange={(event) => {
                this.setState({ label: event.target.value });
              }}
              validate={{
                required: {
                  value: true,
                  errorMessage: "the Question is required",
                },
              }}
            />
            <AvField
              label="Time"
              name="time"
              type="number"
              placeholder="by minutes"
              min="5"
              defaultValue={this.state.time}
              onChange={(event) => {
                this.setState({ time: event.target.value });
              }}
              validate={{
                required: {
                  value: true,
                  errorMessage: "the time is required in minutes",
                },
              }}
            />
            <Label className="mt-4">Skill</Label>
            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              name="form-field-name"
              options={this.state.skills.map((x, i) => {
                return { label: x.label, value: x.id, key: x.id };
              })}
              onChange={(value) => {
                this.setState({ idskill: value });
              }}
            />
            <br></br>
            <Button color="secondary" outline onClick={this.props.toggleModal}>
              <IntlMessages id="cancel" />
            </Button>
            <Button color="primary" type="submit">
              <IntlMessages id="submit" />
            </Button>{" "}
          </AvForm>
        </ModalBody>
      </Modal>
    );
  }
}
AddModal.propType = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    quiz: state.quiz,
  };
}

function mapDispatchtoProps(dispatch) {
  return { actions: bindActionCreators(quizAction, dispatch) };
}
export default connect(mapStateToProps, mapDispatchtoProps)(AddModal);
