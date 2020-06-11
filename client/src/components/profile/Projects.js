import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Alert,
  UncontrolledTooltip,
  Button,
} from "reactstrap";
import classNames from "classnames";
import "../../assets/scss/custom-profile-style/style.scss";
import Loader from "../../helpers/loader";

// single project
const Team = (props) => {
  const team = props.team || {};

  const today = new Date();

  return (
    <Card className="border mt-3">
      <CardBody>
        <div
          className={classNames("badge", "float-right", {
            "badge-success":
              Date.parse(today) > Date.parse(team.project.end_date),
            "badge-warning":
              Date.parse(today) > Date.parse(team.project.start_date) &&
              Date.parse(today) < Date.parse(team.project.end_date),
            "badge-info":
              Date.parse(today) < Date.parse(team.project.start_date),
          })}
        >
          {Date.parse(today) < Date.parse(team.project.start_date)
            ? "Planned"
            : Date.parse(today) > Date.parse(team.project.end_date)
            ? "Finished"
            : "Ongoing"}
        </div>
        <p
          className={classNames("text-uppercase", "font-size-12", "mb-2", {
            "text-success":
              Date.parse(today) > Date.parse(team.project.end_date),
            "text-warning":
              Date.parse(today) > Date.parse(team.project.start_date) &&
              Date.parse(today) < Date.parse(team.project.end_date),
            "text-info":
              Date.parse(today) < Date.parse(team.project.start_date),
          })}
        >
          {team.project.title}
        </p>

        <h5>
          <a href="#" className="text-dark">
            {team.subject.name}
          </a>
        </h5>

        <p className="text-muted mb-4">
          {team.project.short_desc}...
          <a href="#" className="font-weight-bold text-muted ml-2">
            view more
          </a>
        </p>
        <div>
          <span className="rounded-circle bg-soft-warning text-warning font-weight-bold ">
            Team Name : {team.name}
          </span>
          <br />
          <span className="rounded-circle text-muted">
            {team.members.length} members.
          </span>
        </div>
      </CardBody>

      <CardBody className="border-top">
        <Row className="align-items-center">
          <Col className="col-sm-auto">
            <ul className="list-inline mb-0">
              <li className="list-inline-item pr-2">
                <a
                  href="/"
                  className="text-muted d-inline-block"
                  id={`dueDate-${team.project.id}`}
                >
                  <i className="uil uil-calender mr-1"></i>{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }).format(new Date(team.project.end_date))}
                </a>
                <UncontrolledTooltip
                  placement="top"
                  target={`dueDate-${team.project.id}`}
                >
                  Due date
                </UncontrolledTooltip>
              </li>
              <li className="list-inline-item pr-2">
                <a
                  href="#"
                  className="text-muted d-inline-block"
                  id={`noTasks-${team.project.id}`}
                >
                  <i className="uil uil-bars mr-1"></i> XX
                </a>
                <UncontrolledTooltip
                  placement="top"
                  target={`noTasks-${team.project.id}`}
                >
                  Tasks
                </UncontrolledTooltip>
              </li>
            </ul>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

const Projects = ({ teams }) => {
  const [Limit, setLimit] = useState(6);
  const LoadMore = () => {
    setLimit(Limit + 6);
  };

  return teams && teams.length > 0 ? (
    <React.Fragment>
      <h5 className="mt-3">Projects</h5>
      <Row>
        {teams.slice(0, Limit).map((team, i) => {
          return (
            <Col lg={6} xl={4} key={"proj-" + team.id}>
              <Team team={team} key={"-" + i} />
            </Col>
          );
        })}
      </Row>

      <Row className="mb-3 mt-2">
        <Col>
          <div className="text-center">
            {Limit < teams.length && (
              <Button color="white" onClick={LoadMore}>
                <Loader className="icon-dual icon-xs mr-2"></Loader>Load more
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <br />
      <Alert color="warning"> You don't have any projects !!</Alert>
    </React.Fragment>
  );
};

export default Projects;
