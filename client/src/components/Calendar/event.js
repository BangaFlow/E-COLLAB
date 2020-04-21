import React, { Component, Fragment } from 'react'

import { connect } from "react-redux";
import * as eventAction from "../../redux/actions/eventActions"
import PropTypes from 'prop-types'
import { bindActionCreators } from "redux"
import {
    Row,
    Card,
    CardBody,
    Nav,
    NavItem,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    TabContent,
    TabPane,
    Badge
  } from "reactstrap";
  
  import Rating from "../../components/common/Rating";
  
  
  import { Colxx } from "../../components/common/CustomBootstrap";
  import IntlMessages from "../../helpers/IntlMessages";
  import RadialProgressCard from "../../components/cards/RadialProgressCard";
  import { injectIntl } from "react-intl";
  

export class Event extends Component {
    constructor(props) {
        super(props);
     
    
        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
          activeFirstTab: "1"
        };
      }
    
      toggleTab(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeFirstTab: tab
          });
        }
      }
    


    render() {
       
        return (
            <Fragment>
               
        
          <Colxx  xxs="12">
            <h1>{this.props.event.eventName}</h1>
            
            

            <TabContent activeTab={this.state.activeFirstTab}>
              <TabPane tabId="1">
                <Row>
                  <Colxx  lg="12" className="mb-4">
                    <Card className="mb-4">
                      <div className="position-absolute card-top-buttons">
                        <Button outline color={"white"} className="icon-button">
                          <i className="simple-icon-pencil" />
                        </Button>
                      </div>
                     
                      
                      <CardBody>




                        


                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="Description" />
                        </p>
                        <p className="mb-3">
                        {this.props.event.description}
                        </p>

                        <p className="mb-3">
                        {this.props.event.startTime}
                        </p>
                        <div className="mb-3">
                          <Rating total={5} rating={5} interactive={false} />
                        </div>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.price" />
                        </p>
                        <p className="mb-3">$8,14</p>
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.ingredients" />
                        </p>
                        <div className="mb-3">
                          <p className="d-sm-inline-block mb-1">
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Flour
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Chocolate
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Caster Sugar
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Baking Powder
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Milk
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Eggs
                            </Badge>
                            <Badge color="outline-secondary mb-1 mr-1" pill>
                              Vegetable Oil
                            </Badge>
                          </p>
                        </div>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.is-vegan" />
                        </p>
                        <p>No</p>
                      </CardBody>
                    </Card>
                    
                  </Colxx>

                  
                </Row>
              </TabPane>
              <TabPane tabId="2">
               
              </TabPane>
            </TabContent>
          </Colxx>
       
            </Fragment>
        )
    }
}

export default Event;

