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
  Card,
  CardBody,
  CardText,
  CardTitle,
  FormText,
} from "reactstrap";

const GenerateRandomTeamsModal = (props) => {
  const { modal, toggle } = props;
  const { projects, teams } = props.teams;

  const [isLoading, setLoading] = useState(false);
  const [project, setProject] = useState();
  const [hidden, setHidden] = useState(true);
  const [selected, setselected] = useState();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    props.actions.fetchProjects().catch((err) => {
      console.log(err);
    });
  };

  const handleProjectChange = (selected) => {
    const p = selected.value;
    projects.forEach((element) => {
      if (element.id == selected.value) {
        setProject(element);
      }
    });

    setHidden(false);
  };

  const hasTeams = (project) => {
    let aandou = false;
    teams.map((team) => {
      if (team.project.id == project.id) {
        aandou = true;
      }
    });
    return aandou;
  };

  const GenerateRandom = (e) => {
    e.preventDefault();
    props.actions
      .generateRandomTeams(project.id)
      .then(
        swal(
          "RANDOM TEAMS!",
          "Teams generation has been successuly executed!",
          "success"
        )
      )
      .catch((err) => {
        swal("Error!", "An error has occured ! please try again..", "error");
        console.log(err);
      });
    toggle();
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <Form onSubmit={GenerateRandom}>
        <ModalHeader toggle={toggle}>Generate Random Teams</ModalHeader>
        <ModalBody>
          <Colxx xxs="12">
            <FormGroup>
              <Label for="teamname">Please choose the project</Label>
              <FormGroup>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isLoading={isLoading}
                  isSearchable={true}
                  name="color"
                  options={projects
                    .filter((project) => !hasTeams(project))
                    .map((project, i) => {
                      return {
                        label: project.title,
                        value: project.id,
                        key: i,
                      };
                    })}
                  onChange={handleProjectChange}
                  value={selected}
                >
                  <option value="A">Apple</option>
                </Select>
              </FormGroup>
              <FormText color="muted">Please choose wisely</FormText>
            </FormGroup>

            {project && (
              <Card>
                <CardBody>
                  <CardText>
                    <p>
                      <b> Start Date: </b>
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      }).format(new Date(project.start_date))}
                    </p>
                    <p>
                      <b> End Date: </b>
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      }).format(new Date(project.end_date))}
                    </p>
                    {project.number_of_members ? (
                      <p>
                        <b> Number of members per team </b>{" "}
                        {project.number_of_members}
                      </p>
                    ) : (
                      <p>
                        <b> Number of teams: </b> {project.number_of_teams}
                      </p>
                    )}

                    <p>
                      <b> Number of tutors per team </b>
                      {project.number_of_tutors_per_team}
                    </p>
                  </CardText>
                </CardBody>
              </Card>
            )}
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
)(GenerateRandomTeamsModal);
