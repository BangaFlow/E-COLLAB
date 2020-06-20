/* eslint-disable */
import React, { useState, useEffect, Suspense } from "react"
import { connect } from "react-redux"
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
} from "reactstrap"
import classNames from "classnames"

import * as profileActions from "../../redux/actions/profile.actions"
import * as githubActions from "../../redux/actions/github.actions"

import UserBox from "../../components/profile/UserBox"
import Files from "../../components/profile/Files"
import Github from "../../components/profile/Github"
import Messages from "../../components/profile/Messages"
import Projects from "../../components/profile/Projects"
import Tasks from "../../components/profile/Tasks"
import Skills from "../../components/profile/Skills"
import { history } from "../../helpers/history"

const Profile = (props) => {
  let connected_user = JSON.parse(localStorage.getItem("user"))
  const [state, setState] = useState({
    activeTab: "0",
  })

  const Rep = (username) => {
    // console.log(username);
    props.selectUser(username)
    props.fetchUserAndRepos(username)
  }

  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) === null) {
      history.push("/auth")
    }
    if (!Array.isArray(props.profile) && props.profile !== null) {
      // console.log("profile 1");
      Rep(props.profile.github_username)
    } else if (
      (Array.isArray(props.profile) && props.profile.length === 0) ||
      props.profile === null
    ) {
      // console.log("profile 2");
      history.push("/create-profile")
    } else {
      // console.log("profile 3");
      props.mappedfetchProfileById(connected_user.id)
      Rep(props.profile.github_username)
    }
  }, [])

  toggleTab = toggleTab.bind(this)

  function toggleTab(tab) {
    if (state.activeTab !== tab) {
      setState({
        activeTab: tab,
      })
    }
  }

  const repos = props.userRepos.repos
  const profile = props.profile
  const img = props.currentUserData.userData.avatar_url

  return profile != null ? (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <React.Fragment>
        <Row className="page-title">
          <Col md={12}></Col>
        </Row>
        <Row>
          <Col lg={3}>
            {/* User information */}
            <UserBox userInfo={profile} img={img} repos={Rep} />
          </Col>

          <Col lg={9}>
            <Card>
              <CardBody>
                <Nav className="nav nav-pills navtab-bg nav-justified">
                  <NavItem>
                    <NavLink
                      href="#"
                      className={classNames({
                        active: state.activeTab === "0",
                      })}
                      onClick={() => {
                        toggleTab("0")
                      }}
                    >
                      Projects
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#"
                      className={classNames({
                        active: state.activeTab === "1",
                      })}
                      onClick={() => {
                        toggleTab("1")
                      }}
                    >
                      Skills
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#"
                      className={classNames({
                        active: state.activeTab === "2",
                      })}
                      onClick={() => {
                        toggleTab("2")
                      }}
                    >
                      Github
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink
                      href="#"
                      className={classNames({
                        active: state.activeTab === "3",
                      })}
                      onClick={() => {
                        toggleTab("3");
                      }}
                    >
                      Messages
                    </NavLink>
                  </NavItem> */}
                  {/* <NavItem>
                    <NavLink
                      href="#"
                      className={classNames({
                        active: state.activeTab === "4",
                      })}
                      onClick={() => {
                        toggleTab("4");
                      }}
                    >
                      Tasks
                    </NavLink>
                  </NavItem> */}
                  {/* <NavItem>
                    <NavLink
                      href="#"
                      className={classNames({
                        active: state.activeTab === "5",
                      })}
                      onClick={() => {
                        toggleTab("5");
                      }}
                    >
                      Files
                    </NavLink>
                  </NavItem> */}
                </Nav>
                <TabContent activeTab={state.activeTab}>
                  <TabPane tabId="0">
                    <Projects teams={profile.teams} />
                  </TabPane>
                  <TabPane tabId="1">
                    <Skills owned_skills={profile.skills} />
                  </TabPane>
                  <TabPane tabId="2">
                    <Github repos={repos} username={profile.github_username} />
                  </TabPane>
                  <TabPane tabId="3">
                    <Messages />
                  </TabPane>
                  <TabPane tabId="4">
                    <Tasks />
                  </TabPane>
                  <TabPane tabId="5">
                    <Files />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    </Suspense>
  ) : (
    "loading"
  )
}

function mapStateToProps(state) {
  const { profile, currentUser, currentUserData, userRepos } = state
  return {
    profile,
    currentUser,
    currentUserData,
    userRepos,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mappedfetchProfileById: (id) => dispatch(profileActions.fetchProfile(id)),
    selectUser: (username) => dispatch(githubActions.selectUser(username)),
    fetchUserAndRepos: (username) =>
      dispatch(githubActions.fetchUserAndRepos(username)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
