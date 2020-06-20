/* eslint-disable */
import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as teamsAction from "../../redux/actions/teams.actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import Select from "react-select";
import swal from "sweetalert";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  FormText,
} from "reactstrap";

const AssignOrChangeSubjectModal = (props) => {
  const { modal, toggle, team, setTeam } = props;
  const { subjects } = props.teams.selectedTeam.project;

  const [isLoading, setLoading] = useState(false);
  const [subject, setSubject] = useState();
  const [hidden, setHidden] = useState(true);
  const [selected, setselected] = useState();

  const handleSubjectChange = (selected) => {
    subjects.forEach((element) => {
      if (element.id === selected.value) {
        setSubject(element);
      }
    });
    setHidden(false);
  };

  const changeSubject = (e) => {
    e.preventDefault();
    props.actions
      .changeSubject(team.id, subject.id)
      .then(swal("SUBJECT CHANGE!", "A new subject has been assigned!", "success"))
      .catch((err) => {
        swal(
          "Error!",
          "An error has occured while trying to change the subject! please try again..",
          "error"
        );
        console.log(err);
      });

    setTeam({
      ...team,
      subject,
    });
    toggle();
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <Form onSubmit={changeSubject}>
        <ModalHeader toggle={toggle}>Change Subject</ModalHeader>
        <ModalBody>
          <Colxx xxs="12">
            <FormGroup>
              <Label for="teamname">Please choose the subject</Label>
              {team.subject && (
                <FormText>Current Subject : {team.subject.name}</FormText>
              )}
              <FormGroup>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isLoading={isLoading}
                  isSearchable={true}
                  name="color"
                  options={subjects.map((subject, i) => {
                    return {
                      label: subject.name,
                      value: subject.id,
                      key: i,
                    };
                  })}
                  onChange={handleSubjectChange}
                  value={selected}
                ></Select>
              </FormGroup>
            </FormGroup>
          </Colxx>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" disabled={hidden}>
            Confirm
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state, ownProps) => ({ teams: state.teams });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(teamsAction, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignOrChangeSubjectModal);
