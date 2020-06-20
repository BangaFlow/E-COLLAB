
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Badge,Row, Button } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import * as ProjectsActions from "../../../redux/actions/Projects.actions";
import Project from "../../../components/Projects/ProjectCard";
import ProjectForm from "../../../components/Projects/ProjectForm";
import ProjectMenu from "../../../components/Projects/ProjectMenu";

class allprojects extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalOpen: false,
    };
  }
  componentDidMount() {
    this.props.actions.loadProjects().catch((err) => {
      alert(`error ${err}`);
    });
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  render() {
    //const { p } = this.props;
    const { modalOpen } = this.state;
    const projects=this.props.location.pjcts;
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <Breadcrumb heading="Projects" match={this.props.match} />
            <div className="float-sm-right">
              <Button color="primary" size="lg" onClick={this.toggleModal}>
                Add Project
              </Button>
          
            </div>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        
        <Row className="app-row survey-app">
          <Colxx xxs="12" className="mb-4">
            <div>
              
              {projects?
                 projects.map((project) =><Project key={project.id} item={project} />
                ): <Badge color="warning" pill className="mb-1">
                    No projects yet
                </Badge>
                }
            </div>
          </Colxx>
        </Row>
        <ProjectMenu />
        <ProjectForm
          id={this.props.location.id}
          toggleModal={this.toggleModal}
          modalOpen={modalOpen}
          title="Add new Project"
        />
      
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ projects: state.projects });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ProjectsActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(allprojects);  