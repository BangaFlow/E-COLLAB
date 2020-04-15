import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as teamsAction from "../../redux/actions/teams.actions";

import { Colxx } from "../../components/common/CustomBootstrap";

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Badge,
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

function TeamCard({ team, ...props }) {
  const [modal, setModal] = useState(false);
  const [newName, setNewName] = useState(team.name);

  const toggle = () => setModal(!modal);
  const ChangeName = (e) => {
    e.preventDefault();
    props.actions.changeName(team.id, newName).catch((err) => {
      console.log(err);
    });
    toggle();
  };

  return (
    <>
      <Colxx xxs="4" className="mb-4">
        <Card>
          <CardBody>
            <CardTitle>
              {team.name}
              <Badge color="outline-primary" pill className="mb-1" href="#">
                project name
              </Badge>
            </CardTitle>
            <CardSubtitle>{team.members.length} members.</CardSubtitle>
            <CardText>Subject : {team.subject.name}</CardText>
            <div>
              <Button size="xs" onClick={toggle}>
                Change Name
              </Button>
            </div>
          </CardBody>
        </Card>
      </Colxx>

      {/* change name */}
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
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({ teams: state.teams });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(teamsAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamCard);
