import React, { useState, useEffect } from "react";
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
} from "reactstrap";

const AddNewMember = (props) => {
  const { modal, toggle, team, setTeam } = props;
  const { teams } = props.state;
  const { learners_involved } = props.teams.selectedTeam.project;
  const [learner, setLearner] = useState();
  const [hidden, setHidden] = useState(true);
  const [selected, setselected] = useState();

  const handleLearnerChange = (selected) => {
    learners_involved.forEach((element) => {
      if (element.id == selected.value) {
        setLearner(element);
      }
    });
    setHidden(false);
  };

  const isAlreadyAMember = (learner) => {
    let no = false;
    team.members.forEach((member) => {
      if (learner.id == member.id) no = true;
    });
    teams.forEach((teamxx) => {
      if (team.project.id == teamxx.project.id) {        
        teamxx.members.forEach((member) => {          
          if (learner.id == member.id) no = true;
        });        
      }
    });

    return no;
  };

  const updateMembers = (e) => {
    e.preventDefault();
    props.actions
      .addNewMember(team.id, learner.id)
      .then(swal("MEMBER ADDED!", "A new member has been added!", "success"))
      .catch((err) => {
        swal(
          "Error!",
          "An error has occured while trying to add new member! please try again..",
          "error"
        );
        console.log(err);
      });
    team.members.push(learner);
    setHidden(true);
    toggle();
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <Form onSubmit={updateMembers}>
        <ModalHeader toggle={toggle}>Add a member</ModalHeader>
        <ModalBody>
          <Colxx xxs="12">
            <FormGroup>
              <Label for="teamname">Please choose the new member</Label>
              <FormGroup>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable={true}
                  name="color"
                  options={learners_involved
                    .filter((member) => !isAlreadyAMember(member))
                    .map((member, i) => {
                      return {
                        label: member.name,
                        value: member.id,
                        key: i,
                      };
                    })}
                  onChange={handleLearnerChange}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddNewMember);
