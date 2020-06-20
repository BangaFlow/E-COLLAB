import React, { Component, Fragment } from "react";

import {
  Row,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  Badge,
  Button
} from "reactstrap";
import { NavLink } from "react-router-dom";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { injectIntl } from "react-intl";
//import GlideComponentThumbs from "../../../components/carousel/GlideComponentThumbs";
///import { detailImages, detailThumbs } from "../../../data/carouselItems";
//import DataListView from "../../../containers/pages/DataListView";
import Task from "../../../containers/pages/Task";
import TaskForm from "../../../components/Projects/TaskForm";

class Subjectdetail extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1",
    };
   
  }
 /* componentDidMount () {
    const {p}=props.location.pj;

  }*/

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };
  render() {
    const { modalOpen } = this.state;

    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row>
        
        

          <Colxx xxs="12">
            <h1>{this.props.location.subjects.title}</h1>
            
            <div className="text-zero top-right-button-container">
              <UncontrolledDropdown>
                
                  
                  <Button color="primary" size="lg"  className="top-right-button top-right-button-single" onClick={this.toggleModal}>
                Add Task
              </Button>
               
                <DropdownMenu>
                  <DropdownItem header>
                    <IntlMessages id="pages.header" />
                  </DropdownItem>
                  <DropdownItem disabled>
                    <IntlMessages id="pages.delete" />
                  </DropdownItem>
                  <DropdownItem>
                    <IntlMessages id="pages.another-action" />
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <IntlMessages id="pages.another-action" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>

            <Breadcrumb match={this.props.match} />
            <Separator className="mb-5" />

            <Row>
            

              <Colxx xxs="12" xl="12" className="col-right">
                <Card className="mb-4">
                  <CardBody>
                   
                    <p className="mb-3">
                    {this.props.location.subjects.description}                    </p>
                   

                    <div className="mb-3">
                      <div className="post-icon mr-3 d-inline-block">
                        <NavLink to="#">
                          <i className="simple-icon-heart mr-1"></i>
                        </NavLink>
                        <span> {messages["pages.likes"]}</span>
                      </div>

                      <div className="post-icon mr-3 d-inline-block">
                        <NavLink to="#">
                          <i className="simple-icon-bubble mr-1"></i>
                        </NavLink>
                        <span> {messages["pages.comments-title"]}</span>
                      </div>
                    </div>

                  </CardBody>
                </Card>
                </Colxx>
            </Row>


            <Colxx xxs="12" xl="12" className="col-right">
           
                
                
              <br></br>
                                <h3>Planning:</h3>
                { this.props.location.subjects.Planning?


        this.props.location.subjects.Planning.map(project => (

  <Task
  key={project.id}
  product={project}
 
  onCheckItem={this.onCheckItem}
  
/>

    )):<Badge color="warning" pill className="mb-1">
    No Task yet
</Badge>

          }
             
             </Colxx>
          </Colxx>
        </Row>

        <TaskForm
          id={this.props.location.subjects.id}
          toggleModal={this.toggleModal}
          modalOpen={modalOpen}
          title="Add new Task"
        />

      </Fragment>
    );
  }
}
export default injectIntl(Subjectdetail);
