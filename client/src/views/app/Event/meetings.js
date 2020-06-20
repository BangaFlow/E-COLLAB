import React, { Component, Fragment } from "react";
import { Row ,CardTitle,Card,Col,CardBody, Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, InputGroup,
  InputGroupAddon,
  FormGroup,
  Input,
  Label} from "reactstrap";
  import DatePicker from "react-datepicker";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import * as meetingAction from "../../../redux/actions/meetingActions"
import { bindActionCreators } from "redux"

import IconCard from "../../../components/cards/IconCard";
import AddNewMeeting  from '../../../components/Calendar/AddNewMeeting'



export class Meeting extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeFirstTab: "1",
      modalOpen: false,
      startDateTime: null,
      
    }
  }
  componentDidMount() {
    this.props.actions.getAllMeetings().catch(e => {
      alert(e)
    })
  }
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };
  handleChangeDateTime = date => {
    this.setState({
      startDateTime: date
    });
  };
  render() {

  const data = [
    { title: 'dashboards.pending-orders', icon: "iconsminds-clock", value: 14 },
    { title: 'dashboards.completed-orders', icon: "iconsminds-basket-coins", value: 32 },
    { title: 'dashboards.refund-requests', icon: "iconsminds-arrow-refresh", value: 74 },
    { title: 'dashboards.new-comments', icon: "iconsminds-mail-read", value: 25 }
  ] 

    return (
      <Fragment>
      <Row className="app-row survey-app">
      <Colxx xxs="12">
        <Breadcrumb heading="Meetings" match={this.props.match} />
        <div className="float-sm-right">
        <Button color="primary"  size="lg" onClick={this.toggle}>
        <IntlMessages id="New Meeting" />
      </Button>
          
        </div>
        <Separator className="mb-5" />
      
          
      </Colxx>
       </Row>
        <Row>
          <Colxx lg="12" className="mb-4">
            <CardTitle className="mb-4">
              <IntlMessages id="All Meetings" />
            </CardTitle>
            <Row className="icon-cards-row mb-2">

              {this.props.meeting.map((item, index) => {
                return (
                 
                  
                  <Colxx lg="12" className="mb-4" >
                  <Card className="mb-4">
              
                
                  
                  
                  
                    <CardBody className="text-center">

                    <div >
                      <i className="iconsminds-clock" />
                      <p className=" text-center text-center font-weight-bold mb-0"> {`Date :  ${item.startTime}`} </p>
                      <p className="lead text-center">{item.subject}</p>
                      <Row className="mb-3 mt-2">
                      <Col>
                        <div className="text-center"  >
                        <div>
                        <Button size="xs" color={"primary"} >
                        Update
                        </Button>
                        
                        <Button size="xs" color={"primary"} >
                         Delete
                        </Button>
                      </div>
                        </div>
                      </Col>
                    </Row>
                   </div>
                    </CardBody>
                  </Card>
                  </Colxx>
                 
                );
              })}
            </Row>
          </Colxx>
        </Row>

        <div>
       
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <IntlMessages id="Add New Meeting " />
          </ModalHeader>
          <ModalBody>
          <label>
                <IntlMessages id="Subject" />
              </label>
          <InputGroup className="mb-3">
          
          <Input placeholder="title "/>
        </InputGroup>
        <label>
                <IntlMessages id="Start Date" />
              </label>
              <DatePicker
                className="mb-5"
                selected={this.state.startDateTime}
                onChange={this.handleChangeDateTime}
                placeholderText="date"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="Time"
              />

              <label>
              <IntlMessages id="End Date" />
            </label>
            <DatePicker
              className="mb-5"
              selected={this.state.startDateTime}
              onChange={this.handleChangeDateTime}
              placeholderText="date"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="LLL"
              timeCaption="Time"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Add
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    
       
        </Fragment>
      );
    };



    

        
       





      
    
  
  }
Meeting.propType = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  
  return {
    meeting: state.meeting
  }


};

function mapDispatchtoProps(dispatch) {
  return { actions: bindActionCreators(meetingAction, dispatch) }
}
export default connect(mapStateToProps, mapDispatchtoProps)(Meeting);