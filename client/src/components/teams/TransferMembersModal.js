import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as teamsAction from "../../redux/actions/teams.actions";
import { Colxx } from "../common/CustomBootstrap";
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

const TransferMembersModal = (props) => {
  const { modal, toggle, team, setTeam, memberToTransfer } = props;
  const { learners_involved } = props.teams.selectedTeam.project;
  const { teams } = props.state;
  const [newteam, setNewTeam] = useState();
  const [hidden, setHidden] = useState(true);
  const [selected, setselected] = useState();

  const handleTeamsChange = (selected) => {
    teams.forEach((element) => {
      if (element.id == selected.value) {
        setNewTeam(element);
      }
    });
    setHidden(false);
  };

  const updateMembers = (e) => {
    e.preventDefault();
    props.actions
      .transfermember(memberToTransfer.id, team.id, newteam.id)
      .then(
        swal(
          "TRANSFER MEMBERS!",
          "Members transfer has been successuly executed!",
          "success"
        )
      )
      .catch((err) => {
        swal("Error!", "An error has occured ! please try again..", "error");
        console.log(err);
      });

    team.members.splice(team.members.indexOf(memberToTransfer), 1);
    toggle();
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <Form onSubmit={updateMembers}>
        <ModalHeader toggle={toggle}>Transfer member</ModalHeader>
        <ModalBody>
          <Colxx xxs="12">
            <FormGroup>
              <Label for="teamname">Please choose the team</Label>
              <FormGroup>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isLoading={false}
                  isSearchable={true}
                  name="color"
                  options={teams
                    .filter(
                      (element) =>
                        element.id != team.id &&
                        team.project.id == element.project.id
                    )
                    .map((item, i) => {
                      return {
                        label: item.name,
                        value: item.id,
                        key: i,
                      };
                    })}
                  onChange={handleTeamsChange}
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
)(TransferMembersModal);
