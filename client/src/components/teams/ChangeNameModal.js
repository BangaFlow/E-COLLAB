import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as teamsAction from "../../redux/actions/teams.actions";
import { Colxx } from "../../components/common/CustomBootstrap";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

const ChangeNameModal = (props) => {
 
  const { modal, toggle, team, setTeam } = props;

  const [newName, setNewName] = useState(team.name);

  const ChangeName = (e) => {
    e.preventDefault();
    props.actions.changeName(team.id, newName).catch((err) => {
      console.log(err);
    });
    setTeam({
      ...team,
      name: newName,
    });
    toggle();
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <Form onSubmit={ChangeName}>
        <ModalHeader toggle={toggle}>Change Name</ModalHeader>
        <ModalBody>
          <Colxx xxs="12">
            <FormGroup>
              <Label for="exampleEmail">Team name:</Label>
              <Input
                type="text"
                name="name"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
              <FormText color="muted">Please choose wisely</FormText>
            </FormGroup>
          </Colxx>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeNameModal);
