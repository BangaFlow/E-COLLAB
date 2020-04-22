import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classNames from "classnames";

import * as profileActions from "../../redux/actions/profile.actions";

import UserBox from "../../components/profile/UserBox";
import Files from "../../components/profile/Files";
import Activities from "../../components/profile/Activities";
import Messages from "../../components/profile/Messages";
import Projects from "../../components/profile/Projects";
import Tasks from "../../components/profile/Tasks";
import Skills from "../../components/profile/Skills";

const Profile = (props) => {
  let connected_user = JSON.parse(localStorage.getItem("user"));

  const [state, setState] = useState({
    activeTab: "0",
  });

  toggleTab = toggleTab.bind(this);

  function toggleTab(tab) {
    if (state.activeTab !== tab) {
      setState({
        activeTab: tab,
      });
    }
  }

  const data = {
    getProfile: {
      user: connected_user,
      title: "student",
      location: "ras jebel",
      about: "dev student",
      phone: "27902436",
    },
  };
  return (
    <React.Fragment>
      <Row className="page-title">
        <Col md={12}></Col>
      </Row>

      <Row>
        <Col lg={3}>
          {/* User information */}
          <UserBox userInfo={data.getProfile} />
        </Col>

        <Col lg={9}>
          <Card>
            <CardBody>
              <Nav className="nav nav-pills navtab-bg nav-justified">
                <NavItem>
                  <NavLink
                    href="#"
                    className={classNames({ active: state.activeTab === "0" })}
                    onClick={() => {
                      toggleTab("0");
                    }}
                  >
                    Skills
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    className={classNames({ active: state.activeTab === "1" })}
                    onClick={() => {
                      toggleTab("1");
                    }}
                  >
                    Activity
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    className={classNames({ active: state.activeTab === "2" })}
                    onClick={() => {
                      toggleTab("2");
                    }}
                  >
                    Messages
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    className={classNames({ active: state.activeTab === "3" })}
                    onClick={() => {
                      toggleTab("3");
                    }}
                  >
                    Projects
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    className={classNames({ active: state.activeTab === "4" })}
                    onClick={() => {
                      toggleTab("4");
                    }}
                  >
                    Tasks
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="#"
                    className={classNames({ active: state.activeTab === "5" })}
                    onClick={() => {
                      toggleTab("5");
                    }}
                  >
                    Files
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={state.activeTab}>
                <TabPane tabId="0">
                  <Skills />
                </TabPane>
                <TabPane tabId="1">
                  <Activities />
                </TabPane>
                <TabPane tabId="2">
                  <Messages />
                </TabPane>
                <TabPane tabId="3">
                  <Projects />
                </TabPane>
                <TabPane tabId="4">
                  <Tasks />
                </TabPane>
                <TabPane tabId="5">
                  <Files />{" "}
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({ profiles: state.profiles });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(profileActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
