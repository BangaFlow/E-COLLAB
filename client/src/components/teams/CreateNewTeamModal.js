import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as teamsAction from "../../redux/actions/teams.actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import Select from "react-select";

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

const CreateNewTeamModal = (props) => {
  const { projects, teams } = props.teams;
  const { modal, toggle } = props;
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedMembers, setselectedMembers] = useState();
  const [isLoading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [project, setProject] = useState();
  const [hidden, setHidden] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [members, setMembers] = useState([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    props.actions.fetchProjects().catch((err) => {
      console.log(err);
    });
  };

  const hasATeam = (id_member, project) => {
    let aandou = false;
    teams.map((team) => {
      if (team.project.id == project.id) {
        team.members.map((member) => {
          if (member.id == id_member) {
            aandou = true;
          }
        });
      }
    });

    return aandou;
  };

  const handleProjectChange = (selectedProject) => {
    const p = selectedProject.key;
    setProject(projects[p]);
    setHidden(false);
  };

  const handleTeamsChange = (selectedMembers) => {
    setMembers(selectedMembers);
    selectedMembers && selectedMembers.length > 0
      ? setDisabled(false)
      : setDisabled(true);
  };

  const CreateTeam = (e) => {
    e.preventDefault();
    let newTeamMembers = [];
    members.forEach((member) => {
      newTeamMembers.push(member.key);
    });

    props.actions.createTeam(newName, newTeamMembers, project.id).catch((err) => {
      console.log(err);
    });
    setHidden(true);
    setDisabled(true);
    toggle();
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <Form onSubmit={CreateTeam}>
        <ModalHeader toggle={toggle}>Create Team</ModalHeader>
        <ModalBody>
          <Colxx xxs="12">
            <Label for="teamname">Please choose the project</Label>
            <FormGroup>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isLoading={isLoading}
                isSearchable={true}
                name="color"
                options={projects.map((project, i) => {
                  return { label: project.title, value: project.id, key: i };
                })}
                onChange={handleProjectChange}
                value={selectedProject}
              >
                <option value="A">Apple</option>
              </Select>
            </FormGroup>
            {!hidden && (
              <>
                <FormGroup>
                  <Label for="teamname">Team name:</Label>
                  <Input
                    type="text"
                    name="teamname"
                    value={newName}
                    required
                    onChange={(e) => {
                      setNewName(e.target.value);
                    }}
                  />
                  <FormText color="muted">Please choose wisely</FormText>
                </FormGroup>
                <Label>Please choose the members</Label>
                <FormGroup>
                  <Select
                    isMulti
                    value={selectedMembers}
                    onChange={handleTeamsChange}
                    isSearchable={true}
                    options={project.learners_involved
                      .filter((learner) => !hasATeam(learner.id, project))
                      .map((learner, i) => {
                        return {
                          label: learner.name,
                          value: learner.id,
                          key: learner.id,
                        };
                      })}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </FormGroup>
              </>
            )}
          </Colxx>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={disabled} type="submit">
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewTeamModal);
