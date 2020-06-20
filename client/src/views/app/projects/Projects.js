import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Badge,Row, Button,Input } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import * as ProjectsActions from "../../../redux/actions/Projects.actions";
import Project from "../../../components/Projects/ProjectCard";
import ProjectForm from "../../../components/Projects/ProjectForm";
import ProjectMenu from "../../../components/Projects/ProjectMenu";

class Projects extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalOpen: false,
      search:''
    };
  }
  componentDidMount() {
    this.props.actions.loadProjects().catch((err) => {
      alert(`error ${err}`);
    });
  }
  updatesearch(event){
    this.setState({search: event.target.value.substr(0,20)});
  }
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  render() {
    //const { p } = this.props;
    const { modalOpen } = this.state;
    let filteredProjects=this.props.projects.filter((p)=>{
      return p.title.indexOf(this.state.search) !=-1;
    });
    return (

      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <Breadcrumb heading="Projects" match={this.props.match} />
            <div className="float-sm-right">
              
          
            </div>
            <Separator className="mb-5" />
            <Colxx xxs="12">
            <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <Input
                    type="text"
                    name="keyword"
                    value={this.state.search}
                    onChange={this.updatesearch.bind(this)}
                    id="search"
                    placeholder="search ..."
                   
                  ></Input>
                </div>
                </Colxx>

            
          </Colxx>
        </Row>
        
        <Row className="app-row survey-app">
          <Colxx xxs="12" className="mb-4">
            <div>
              {filteredProjects?
                 filteredProjects.map((project) =><Project key={project.id} item={project} />
                ):
                <Badge color="warning" pill className="mb-1">
               
              </Badge>
                }
            </div>
          </Colxx>
        </Row>
        <ProjectMenu />
        <ProjectForm
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

export default connect(mapStateToProps, mapDispatchToProps)(Projects);  