import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Card,
  CardBody,
  Button,
  TabContent,
  TabPane,
  Badge,
  Collapse,Form,FormGroup,Input,Label 
  
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { connect } from "react-redux";
import * as eventAction from "../../redux/actions/eventActions"
import { bindActionCreators } from "redux"
import UpdateModal from "./UpdateModal";



export class Event extends Component {
  constructor(props) {
    super(props);


    this.toggleTab = this.toggleTab.bind(this);
    this.toggle=this.toggle.bind(this)
    
    this.state = {
      activeFirstTab: "1",
      isOpen:false
    };
  
   
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };


  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }


   toggle = () => {
     this.setState({
      isOpen: !this.state.isOpen
    });
  };


  handleDelete = () => {
  
    this.props.actions.deleteEvent(this.props.event.id).catch((err) => {
      console.log(err);
    });
   
  };
  



  render() {
   
    return (
      <Fragment>


        <Colxx xxs="4" className="mb-4">




          <TabContent activeTab={this.state.activeFirstTab}>
            <TabPane tabId="1">
              <Row>
                <Colxx lg="12" className="mb-4">
                  <Card className="mb-4">
                   

                    <div className="position-absolute card-top-buttons">
                      <Button outline color={"white"} className="icon-button"   onClick={this.toggleModal}>
                        <i className="simple-icon-pencil" />
                        
                      </Button>
                      <Button outline color={"white"} className="icon-button" onClick={this.handleDelete}>
                        <i className="simple-icon-trash"  />
                        
                      </Button>
                    </div>
                    
                      
                    
                    
               

                    <CardBody>


                 
           
            

                    <h1>{this.props.event.eventName}</h1>

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="Event Type" />
                      </p>
                      <p className="mb-3">
                        {this.props.event.eventType}
                      </p>
                      <p className="text-muted text-small mb-2">
                      <IntlMessages id="Organiser" />
                    </p>
                    <p className="mb-3">
                      {this.props.event.eventOrganizer}
                    </p>

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="Place" />
                      </p>
                      <p className="mb-3">
                      {this.props.event.place}
                    </p>
                      
                      <p className="text-muted text-small mb-2">
                      <IntlMessages id="Date" />
                    </p>
                    <p className="mb-3">
                      {(new Date(this.props.event.Date)).toDateString()}
                    </p>

                     

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="Description" />
                      </p>
                      <p className="mb-3">
                        {this.props.event.description}
                      </p>
                      <Badge color="outline-secondary mb-1 mr-1" className="text-center" pill >
                      Participate
                     </Badge>
                      

                      
                    </CardBody>
                  </Card>

                </Colxx>


              </Row>
            </TabPane>
            <TabPane tabId="2">

            </TabPane>
          </TabContent>
        </Colxx>



        <UpdateModal
        modalOpen={this.state.modalOpen}
        toggleModal={this.toggleModal} currentEvent={this.props.event} />

        <Collapse isOpen={this.state.isOpen}>
        <Card>
          <CardBody>
            <Form o>
              <FormGroup>
                <Label>Label</Label>
                <Input
                  type="text"
                  name="label"
                  placeholder="Label"
                  
                  
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="textarea"
                  name="desc"
                  placeholder="Description"
                
                 
                />
              </FormGroup>
              <FormGroup>
                <Label>Type</Label>
                <Input
                  type="select"
                  name="type"
                  
                >
                  <option value="Technical skill">Technical skill</option>
                  <option value="Soft skill">Soft skill</option>
                </Input>
              </FormGroup>
              <Button color="secondary" size="s">
                Update
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Collapse>





      </Fragment>
    )
  }
}
Event.propType = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired
};
function mapStateToProps(state) {
  
  return {
    events: state.event
  }


};
function mapDispatchtoProps(dispatch) {
  return { actions: bindActionCreators(eventAction, dispatch) }
}
 export default connect(mapStateToProps, mapDispatchtoProps)(Event);

