import React, { Component, Fragment } from "react";

import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Badge,
  CardHeader,
  Table,
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
//import GlideComponentThumbs from "../../../components/carousel/GlideComponentThumbs";
///import { detailImages, detailThumbs } from "../../../data/carouselItems";
import { detailsQuestionsData } from "../../../data/questions";
import CommentWithLikes from "../../../components/pages/CommentWithLikes";
import { commentWithLikesData } from "../../../data/comments";
import QuestionAnswer from "../../../components/pages/QuestionAnswer";
import DataListView from "../../../containers/pages/DataListView";
import SubjectForm from "../../../components/Projects/SubjectForm";

class DetailsPages extends Component {
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
            <h1>{this.props.location.pj.title}</h1>
            <div className="text-zero top-right-button-container">

            <Button color="primary" size="lg" onClick={this.toggleModal}>
                Add Subject
              </Button>
              
            </div>

            <Breadcrumb match={this.props.match} />
            <Separator className="mb-5" />

            <Row>
              <Colxx xxs="12" xl="12" className="col-left">
                <Card className="mb-4">
                  <CardBody>
               {this.props.location.pj.title}
               
                  </CardBody>
                </Card>
                <Card className="mb-4">
                  <CardHeader>
                    <Nav tabs className="card-header-tabs ">
                      <NavItem>
                      
                      </NavItem>
                      <NavItem>
                       
                      </NavItem>
                      <NavItem>
                        
                      </NavItem>
                    </Nav>
                  </CardHeader>

                  <TabContent activeTab={this.state.activeFirstTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                           
                            <p className="font-weight-bold">Details</p>
                            <Table borderless>
                              <thead>
                                <tr>
                                  <th scope="col">number of teams :</th>
                                  <th scope="col">number of members :</th>
                                  <th scope="col">number of tutors :</th>
                                  
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">{this.props.location.pj.number_of_teams}</th>
                                  <td>{this.props.location.pj.number_of_members}</td>
                                  <td>{this.props.location.pj.number_of_tutors_per_team}</td>
                                  
                                </tr>
                                <tr>
                                  <th scope="row">Start date :</th>
                                  <td>{this.props.location.pj.start_date}</td>
                                  
                                </tr>
                                <tr>
                                  <th scope="row">End date :</th>
                                  <td colSpan="2">{this.props.location.pj.end_date}</td>
                                 
                                </tr>
                                <tr>
                                  <th scope="row">School year :</th>
                                  <td colSpan="2">{this.props.location.pj.school_year}</td>
                                 
                                </tr>
                              </tbody>
                            </Table>
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            {
                              commentWithLikesData.map((item, index) => {
                                return (<CommentWithLikes data={item} key={item.key}></CommentWithLikes>);
                              })
                            }
                            <InputGroup className="comment-contaiener">
                              <Input placeholder={messages["pages.addComment"]}/>
                              <InputGroupAddon addonType="append">
                                <Button color="primary">
                                  <span className="d-inline-block">{messages["pages.send"]}</span> <i className="simple-icon-arrow-right ml-2"></i>
                                </Button>
                              </InputGroupAddon>
                            </InputGroup>
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            {
                              detailsQuestionsData.map((item, index) => {
                                return (<QuestionAnswer data={item} key={item.key}></QuestionAnswer>);
                              })
                            }
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Card>

              </Colxx>

            
             <Colxx xxs="12" xl="12" className="col-left">
             
                <Card>
                  <CardBody>
              <p className="font-weight-bold">Subjects:</p>
               
                  </CardBody>
                </Card>

                </Colxx>
           
                
                                
                { this.props.location.pj.subjects?


        this.props.location.pj.subjects.map(project => (

  <DataListView
  key={project.id}
  product={project}
 
  onCheckItem={this.onCheckItem}
  
/>

    )):<Badge color="warning" pill className="mb-1">
    No subjects yet
</Badge>

          }
               
              
            </Row>
          </Colxx>
        </Row>

        <SubjectForm
          id={this.props.location.pj.id}
          toggleModal={this.toggleModal}
          modalOpen={modalOpen}
          title="Add new Subject"
        />

      </Fragment>
    );
  }
}
export default injectIntl(DetailsPages);




/*





 <Colxx xxs="12" xl="4" className="col-right">
                <Card className="mb-4">
                  <CardBody>
                    <div className="mb-3">
                      <div className="post-icon mr-3 d-inline-block">
                        <NavLink to="#">
                          <i className="simple-icon-heart mr-1"></i>
                        </NavLink>
                        <span>4 {messages["pages.likes"]}</span>
                      </div>

                      <div className="post-icon mr-3 d-inline-block">
                        <NavLink to="#">
                          <i className="simple-icon-bubble mr-1"></i>
                        </NavLink>
                        <span>2 {messages["pages.comments-title"]}</span>
                      </div>
                    </div>
                    <p className="mb-3">
                      Vivamus ultricies augue vitae commodo condimentum. Nullam faucibus eros eu mauris feugiat, eget consectetur tortor tempus.
                      <br /><br />
                      Sed volutpat mollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque quis cursus mauris.
                      <br /><br />
                      Nulla non purus fermentum, pulvinar dui condimentum, malesuada nibh. Sed viverra quam urna, at condimentum ante viverra non. Mauris posuere erat sapien, a convallis libero lobortis sit amet. Suspendisse in orci tellus.
                    </p>
                    <p className="text-muted text-small mb-2">{messages["forms.tags"]}</p>
                    <p className="mb-3">
                      <Badge color="outline-secondary" className="mb-1 mr-1" pill>FRONTEND</Badge>
                      <Badge color="outline-secondary" className="mb-1 mr-1" pill>JAVASCRIPT</Badge>
                      <Badge color="outline-secondary" className="mb-1 mr-1" pill>SECURITY</Badge>
                      <Badge color="outline-secondary" className="mb-1 mr-1" pill>DESIGN</Badge>
                    </p>
                  </CardBody>
                </Card>
                </Colxx>



                */
