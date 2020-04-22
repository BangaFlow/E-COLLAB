// @flow
import React from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import "../../assets/scss/custom-profile-style/style.scss";

import { projects } from "./Data";

// single project
const Skill = (props) => {
  const project = props.project || {};

  return (
    <Card className="border">
      <CardBody>
        <h5>
          <a href="/" className="text-dark">
            {project.title}
          </a>
        </h5>

        <p className="text-muted mb-4">
          {project.shortDesc}...
          <a href="/" className="font-weight-bold text-muted ml-2">
            view more
          </a>
        </p>
      </CardBody>
    </Card>
  );
};

const Skills = () => {
  return (
    <React.Fragment>
      <h5 className="mt-3">Skills</h5>

      <Row>
        {projects.map((project, i) => {
          return (
            <Col lg={6} xl={4} key={"proj-" + project.id}>
              <Skill project={project} />
            </Col>
          );
        })}
      </Row>

      <Row className="mb-3 mt-2">
        <Col>
          <div className="text-center">
            <Button color="white">
              {/* <Loader className="icon-dual icon-xs mr-2"></Loader>Load more */}
            </Button>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Skills;
