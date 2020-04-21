import React, { Component, Fragment } from "react";
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



class DetailsPages extends Component {
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
    const { messages } = this.props.intl;

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>Chocolate Cake</h1>
            
            

            <TabContent activeTab={this.state.activeFirstTab}>
              <TabPane tabId="1">
                <Row>
                  <Colxx xxs="12" lg="4" className="mb-4">
                    <Card className="mb-4">
                      <div className="position-absolute card-top-buttons">
                        <Button outline color={"white"} className="icon-button">
                          <i className="simple-icon-pencil" />
                        </Button>
                      </div>
                      <img
                        src="/assets/img/detail.jpg"
                        alt="Detail"
                        className="card-img-top"
                      />

                      <CardBody>
                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.description" />
                        </p>
                        <p className="mb-3">
                          It’s all about simplicity…Less is more. Chocolate Cake
                          exclusively brings you the classic chocolate cake.
                          This cake is the one you always dream of-moist cake
                          and creamy chocolate frosting.
                          <br />
                          <br /> This cake proudly serves itself for a family
                          gathering, a dinner party, a birthday celebration, a
                          baby christening, and a gift to someone special or
                          simply to have on hand on the cake stand at home
                          served with an ice cold glass of milk!
                        </p>

                        <p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.rating" />
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
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(DetailsPages);
