import React, { useState, useEffect } from "react";
import { Row, Card, CardTitle, CardBody, CardText, Table } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import ChangeNameModal from "../../../components/teams/ChangeNameModal";
import { bindActionCreators } from "redux";
import * as teamsAction from "../../../redux/actions/teams.actions";
import { connect } from "react-redux";
import { history } from "../../../helpers/history";

const Team = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [team, setTeam] = useState(props.state.selectedTeam);

  const goBack = () => {
    history.push("/app/teams/all");
  }
  if (!team) {
    history.push("/app/teams/all");
  }

  return (
    team && (
      <React.Fragment>
        <a onClick={()=> goBack()} >back</a>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.team" match={props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Card className="w-100">
            <CardBody>
              <CardTitle>
                <h2>
                  TEAM {team.name.toUpperCase()}
                  <i className="iconsminds-pen-2" onClick={() => toggle()}></i>
                </h2>
              </CardTitle>
              <Row className="d-flex justify-content-center">
                <Card className="col-7">
                  <CardBody>
                    <CardTitle>
                      <h3>Project</h3>
                    </CardTitle>
                    <CardText>
                      <p>
                        <b>Title: </b>
                        {team.project.title}
                      </p>
                      <p>
                        <b> Start Date: </b>
                        {new Intl.DateTimeFormat("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        }).format(new Date(team.project.start_date))}
                      </p>
                      <p>
                        <b> End Date: </b>
                        {new Intl.DateTimeFormat("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        }).format(new Date(team.project.end_date))}
                      </p>
                    </CardText>
                  </CardBody>
                </Card>
                <Card className="col-4 ml-3">
                  <CardBody>
                    <CardTitle>
                      <h3>Subject</h3>
                    </CardTitle>
                    <CardText>
                      {team.subject ? (
                        <>
                          <b> Name: </b>
                          <p>{team.subject.name}</p>
                          <div className="badge badge-info float-right mr-1">
                            Change Subject
                          </div>
                        </>
                      ) : (
                        <div className="badge badge-secondary float-right mr-1">
                          Assign Subject
                        </div>
                      )}
                    </CardText>
                  </CardBody>
                </Card>
              </Row>
              <Row className="d-flex justify-content-center">
                <Card className="w-90 mt-3">
                  <CardBody>
                    <CardTitle>
                      <h3>Members</h3>
                    </CardTitle>
                    <CardText>
                      <Table hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>
                              Actions{" "}
                              <div className="badge badge-success float-right  mr-1">
                                Add new member
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.members &&
                            team.members.map((member, id) => (
                              <tr>
                                <th scope="row">{id + 1}</th>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>
                                  <div className="badge badge-info  mr-1">
                                    Swap
                                  </div>
                                  <div className="badge badge-danger t mr-1">
                                    Transfer
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </CardText>
                  </CardBody>
                </Card>
              </Row>
              <Row className="d-flex justify-content-center">
                <Card className="w-90 mt-3">
                  <CardBody>
                    <CardTitle>
                      <h3>Tutors</h3>
                      <p color="muted">
                        {!team.tutors || team.tutors.length == 0
                          ? "this team has no tutors, please add.."
                          : null}
                      </p>
                    </CardTitle>
                    <CardText>
                      <Table hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>
                              {" "}
                              Actions{" "}
                              <div className="badge badge-success float-right  mr-1">
                                Add new tutor
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.tutors &&
                            team.tutors.map((tutor, id) => (
                              <tr>
                                <th scope="row">{id + 1}</th>
                                <td>{tutor.name}</td>
                                <td>{tutor.email}</td>
                                <td>
                                  <div className="badge badge-info  mr-1">
                                    Change
                                  </div>
                                  <div className="badge badge-danger t mr-1">
                                    Remove
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </CardText>
                  </CardBody>
                </Card>
              </Row>
            </CardBody>
          </Card>
        </Row>
        <ChangeNameModal
          modal={modal}
          toggle={toggle}
          team={team}
          setTeam={setTeam}
          {...props}
        />
      </React.Fragment>
    )
  );
};

const mapStateToProps = (state, ownProps) => ({ state: state.teams });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(teamsAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);
