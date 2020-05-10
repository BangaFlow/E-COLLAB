import React, { Component, Fragment } from "react";
import { Row, Card,Button, CustomInput, CardTitle,FormGroup,Badge } from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb" ;
import { NavLink } from "react-router-dom";
 
export default class Quizzes extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalOpen: false,
      
    }
  }
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

    render() {
        return (
            <Fragment>

           
            <Row>
              <Colxx xxs="12">
                <Breadcrumb heading="menu.Quizzes" match={this.props.match} />
                <div className="float-sm-right">
                <Button color="primary" size="lg" onClick={this.toggleModal}>
                  New Meeting
                </Button>
              </div>
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12" className="mb-4">
                <p><IntlMessages id="menu.Quizzes"/></p>
              </Colxx>
            </Row>
            <Row>
            <Colxx xxs="12">
            
              <Row>
                <Colxx xxs="12">
                  <Card className="d-flex flex-row mb-3">
                    <NavLink to="/app/questions" className="d-flex">
                      <img alt="Thumbnail" src="/assets/img/quiz.jpg" className="list-thumbnail responsive border-0" />
                    </NavLink>
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                      <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                        <NavLink to="/app/questions" className="w-40 w-sm-100">
                          <p className="list-item-heading mb-1 truncate">React</p>
                        </NavLink>
                        <p className="mb-1 text-muted text-small w-15 w-sm-100">1 Question</p>
                        <p className="mb-1 text-muted text-small w-15 w-sm-100"></p>
                        <div className="w-15 w-sm-100">
                        <NavLink to="/app/questions" className="d-flex">
                          <Badge color="primary" pill >Show questions</Badge>
                          </NavLink>
                        </div>
                      </div>
                      <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                     
                      </div>
                    </div>
                  </Card>
                </Colxx>
                
              </Row>
            </Colxx>
          </Row>

          </Fragment>
        )
    }
}
