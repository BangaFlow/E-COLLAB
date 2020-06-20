/* eslint-disable */
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Table, Card, CardBody, Button } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import classNames from "classnames";
import { history } from "../../../helpers/history";
import Loader from "../../../helpers/loader";

import * as teamsAction from "../../../redux/actions/teams.actions";
import CreateNewTeamModal from "../../../components/teams/CreateNewTeamModal";
import GenerateRandomTeamsModal from "../../../components/teams/GenerateRandomTeamsModal";

function AllTeams(props) {
  const { teams, fetchedTeams } = props.state;
  const [modalCreateTeam, setModalCreateTeam] = useState(false);
  const toggleodalCreateTeam = () => setModalCreateTeam(!modalCreateTeam);
  const [modalGenerateRandomTeam, setModalGenerateRandomTeam] = useState(false);
  const [Limit, setLimit] = useState(7);

  const toggleGenerateRandomTeam = () =>
    setModalGenerateRandomTeam(!modalGenerateRandomTeam);

  useEffect(() => {
    if (!fetchedTeams) {
      props.actions.fetchTeams().catch((err) => {
        alert(`error ${err}`);
      });
    }
  }, []);

  const showDetails = (team) => {
    props.actions.setSelectedTeam(team);
    history.push("/app/teams/team");
  };

  const LoadMore = () => {
    setLimit(Limit + 5);
  };

  return (
    <Fragment>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.teams.all" match={props.match} />
          <div
            className="badge badge-primary float-right  mr-1"
            onClick={() => toggleodalCreateTeam()}
          >
            Create new Team
          </div>
          <div
            className="badge badge-info float-right  mr-1"
            onClick={() => toggleGenerateRandomTeam()}
          >
            Generate random teams
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Card className="w-100">
          <CardBody>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>Project</th>
                  <th>Subject</th>
                  <th>Number of members</th>
                  {/* <th>Learners choosing teams</th> */}
                  <th>Project Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams &&
                  teams.slice(0, Limit).map((team, id) => (
                    <tr key={id}>
                      <th scope="row">{id + 1}</th>
                      <td>{team.name}</td>
                      <td>{team.project.title}</td>
                      <td>
                        {team.subject ? (
                          team.subject.title
                        ) : (
                          <i className="text-danger">
                            Not selected yet, please assign one
                          </i>
                        )}
                      </td>
                      <td>{team.members.length}</td>
                      {/* <td>
                        <div
                          className={classNames("badge", "mr-1", {
                            "badge-success": team.project.learners_choose_teams,
                            "badge-danger": !team.project.learners_choose_teams,
                          })}
                        >
                          {team.project.learners_choose_teams ? "Yes" : "No"}
                        </div>
                        {team.project.learners_choose_teams && (
                          <div
                            className={classNames("badge", {
                              "badge-success":
                                Date.parse(new Date()) >
                                Date.parse(
                                  team.project.choose_date_limit.end_choose_date
                                ),
                              "badge-warning":
                                Date.parse(new Date()) >
                                  Date.parse(
                                    team.project.choose_date_limit
                                      .start_choose_date
                                  ) &&
                                Date.parse(new Date()) <
                                  Date.parse(
                                    team.project.choose_date_limit
                                      .end_choose_date
                                  ),
                              "badge-info":
                                Date.parse(new Date()) <
                                Date.parse(
                                  team.project.choose_date_limit
                                    .start_choose_date
                                ),
                            })}
                          >
                            {Date.parse(new Date()) <
                            Date.parse(
                              team.project.choose_date_limit.start_choose_date
                            )
                              ? "Planned"
                              : Date.parse(new Date()) >
                                Date.parse(
                                  team.project.choose_date_limit.end_choose_date
                                )
                              ? "Finished"
                              : "Ongoing"}
                          </div>
                        )}
                      </td> */}
                      <td>
                        <div
                          className={classNames("badge", {
                            "badge-success":
                              Date.parse(new Date()) >
                              Date.parse(team.project.end_date),
                            "badge-warning":
                              Date.parse(new Date()) >
                                Date.parse(team.project.start_date) &&
                              Date.parse(new Date()) <
                                Date.parse(team.project.end_date),
                            "badge-info":
                              Date.parse(new Date()) <
                              Date.parse(team.project.start_date),
                          })}
                        >
                          {Date.parse(new Date()) <
                          Date.parse(team.project.start_date)
                            ? "Planned"
                            : Date.parse(new Date()) >
                              Date.parse(team.project.end_date)
                            ? "Finished"
                            : "Ongoing"}
                        </div>
                      </td>
                      <td>
                        <div
                          onClick={() => {
                            showDetails(team);
                          }}
                          className="badge badge-dark mr-1"
                        >
                          Details
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div className="text-center mb-2">
              {Limit < teams.length && (
                <Button color="white" onClick={LoadMore}>
                  <Loader className="icon-dual icon-xs mr-2"></Loader>Load more
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </Row>

      <CreateNewTeamModal
        modal={modalCreateTeam}
        toggle={toggleodalCreateTeam}
      />
      <GenerateRandomTeamsModal
        modal={modalGenerateRandomTeam}
        toggle={toggleGenerateRandomTeam}
      />
    </Fragment>
  );
}

const mapStateToProps = (state, ownProps) => ({ state: state.teams });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(teamsAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTeams);
