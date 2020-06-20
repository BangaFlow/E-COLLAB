import React, { useState } from "react";
import { Row, Card, CardTitle, CardBody, CardText, Table } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { history } from "../../../helpers/history";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import * as teamsAction from "../../../redux/actions/teams.actions";
import ChangeNameModal from "../../../components/teams/ChangeNameModal";
import AssignOrChangeSubjectModal from "../../../components/teams/AssignOrChangeSubjectModal";
import AddTutorModal from "../../../components/teams/AddTutorModal";
import SwapTutors from "../../../components/teams/SwapTutors";
import TransferMembersModal from "../../../components/teams/TransferMembersModal";
import SwapMembers from "../../../components/teams/SwapMembers";
import AddNewMember from "../../../components/teams/AddNewMember";
import swal from "sweetalert";

const Team = (props) => {
  //name modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  //subject modal
  const [subjectModal, setSubjectModale] = useState(false);
  const toggleSubjectModal = () => setSubjectModale(!subjectModal);
  //add tutor modal
  const [addTutorModalState, setAddTutorModalState] = useState(false);
  const toggleAddTutorModalState = () =>
    setAddTutorModalState(!addTutorModalState);
  //swap tutors
  const [swapTutorModalState, setSwapTutorModalState] = useState(false);
  const toggleSwapTutorModalState = () =>
    setSwapTutorModalState(!swapTutorModalState);
  const [tutorToChange, setTutorToChange] = useState();
  //transfer members
  const [transferMemberModalState, setTransferMemberModalState] = useState(
    false
  );
  const toggleTransferMemberModalState = () =>
    setTransferMemberModalState(!transferMemberModalState);
  const [memberToTransfer, setMemberToTransfer] = useState();
  //swap members
  const [swapMemberModalState, setSwapMemberModalState] = useState(false);
  const toggleSwapMemberModalState = () =>
    setSwapMemberModalState(!swapMemberModalState);
  //add member
  const [addMemberModalState, setAddMemberModalState] = useState(false);
  const toggleAddMemberModalState = () =>
    setAddMemberModalState(!addMemberModalState);

  const [team, setTeam] = useState(props.state.selectedTeam);

  if (!team) {
    history.push("/app/teams/all");
  }

  const removeMember = (pos) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to remove this member from this group?!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        props.actions
          .removeMember(team.id, team.members[pos].id)
          .then(
            team.members.splice(pos, 1)
          )
          .then(
            swal("MEMBER REMOVED!", "The member has been removed!", "success")
          )
          .catch((err) => {
            swal(
              "Error!",
              "An error has occured ! please try again..",
              "error"
            );
            console.log(err);
          });
      }
    });
  };

  const removeTutor = (pos) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to remove this tutor from this group?!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        props.actions
          .removeTutor(team.id, team.tutors[pos].id)
          .then(
            team.tutors.splice(pos, 1)
          )
          .then(
            swal("TUTOR REMOVED!", "The tutor has been removed!", "success")
          )
          .catch((err) => {
            swal(
              "Error!",
              "An error has occured ! please try again..",
              "error"
            );
            console.log(err);
          });
      }
    });
  };

  return (
    team && (
      <React.Fragment>
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
                          <p>{team.subject.title}</p>
                          <div
                            className="badge badge-info float-right mr-1"
                            onClick={() => toggleSubjectModal()}
                          >
                            Change Subject
                          </div>
                        </>
                      ) : (
                        <div
                          className="badge badge-secondary float-right mr-1"
                          onClick={() => toggleSubjectModal()}
                        >
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
                              Actions
                              <div
                                className="badge badge-success float-right  mr-1"
                                onClick={() => toggleAddMemberModalState()}
                              >
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
                                  <div
                                    className="badge badge-info  mr-1"
                                    onClick={() => {
                                      setMemberToTransfer(member);
                                      toggleSwapMemberModalState();
                                    }}
                                  >
                                    Swap
                                  </div>
                                  <div
                                    className="badge badge-secondary t mr-1"
                                    onClick={() => {
                                      setMemberToTransfer(member);
                                      toggleTransferMemberModalState();
                                    }}
                                  >
                                    Transfer
                                  </div>
                                  <div
                                    className="badge badge-danger t mr-1"
                                    onClick={() => {
                                      removeMember(id);
                                    }}
                                  >
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
              <Row className="d-flex justify-content-center">
                <Card className="w-90 mt-3">
                  <CardBody>
                    <CardTitle>
                      <h3>Tutors</h3>
                      <p color="muted">
                        {!team.tutors || team.tutors.length === 0
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
                              Actions
                              <div
                                className="badge badge-success float-right  mr-1"
                                onClick={() => toggleAddTutorModalState()}
                              >
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
                                  <div
                                    className="badge badge-info  mr-1"
                                    onClick={() => {
                                      setTutorToChange(tutor);
                                      toggleSwapTutorModalState();
                                    }}
                                  >
                                    Change
                                  </div>
                                  <div
                                    className="badge badge-danger t mr-1"
                                    onClick={() => {
                                      removeTutor(id);
                                    }}
                                  >
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
        <AssignOrChangeSubjectModal
          modal={subjectModal}
          toggle={toggleSubjectModal}
          team={team}
          setTeam={setTeam}
          {...props}
        />
        <AddTutorModal
          modal={addTutorModalState}
          toggle={toggleAddTutorModalState}
          team={team}
          setTeam={setTeam}
          {...props}
        />
        <SwapTutors
          modal={swapTutorModalState}
          toggle={toggleSwapTutorModalState}
          team={team}
          setTeam={setTeam}
          tutorToChange={tutorToChange}
          {...props}
        />
        <TransferMembersModal
          modal={transferMemberModalState}
          toggle={toggleTransferMemberModalState}
          team={team}
          setTeam={setTeam}
          memberToTransfer={memberToTransfer}
          {...props}
        />
        <SwapMembers
          modal={swapMemberModalState}
          toggle={toggleSwapMemberModalState}
          team={team}
          setTeam={setTeam}
          memberToTransfer={memberToTransfer}
          {...props}
        />
        <AddNewMember
          modal={addMemberModalState}
          toggle={toggleAddMemberModalState}
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
