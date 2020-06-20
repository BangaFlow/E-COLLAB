import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Button,Input } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import * as ProjectsActions from "../../../redux/actions/Projects.actions";
import Subject from "../../../components/Projects/SubjectCard";
import ProjectForm from "../../../components/Projects/ProjectForm";
import SubjectMenu from "../../../components/Projects/SubjectMenu";

import * as subjectActions from "../../../redux/actions/subjects.actions";

class Subjects extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalOpen: false,
      
    };
  }
  componentDidMount() {
    this.props.actions.loadSubjects().catch((err) => {
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
    let filteredSubjects=this.props.subjects;
    return (
      <Fragment>
        <Row className="app-row survey-app">
          <Colxx xxs="12">
            <Breadcrumb heading="Subjects" match={this.props.match} />
            <div className="float-sm-right">
             
            </div>
            <Separator className="mb-5" />
           
                

          </Colxx>
        </Row>
        
        <Row className="app-row survey-app">
          <Colxx xxs="12" className="mb-4">
            <div>
              {filteredSubjects?
                 filteredSubjects.map((subject) =><Subject key={subject.id} item={subject} />
                ):"loading"
                }
            </div>
          </Colxx>
        </Row>
       
        <SubjectMenu />
      
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ subjects: state.subjects});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(subjectActions, dispatch),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Subjects);  