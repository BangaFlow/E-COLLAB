import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Menu, X, Search, Settings, User, HelpCircle, Lock, LogOut } from 'react-feather';

import NotificationDropdown from './NotificationDropdown';


const Notifications = [];

class Topbar extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="navbar navbar-expand flex-column flex-md-row navbar-custom">
          <Container fluid>
            { /* logo */}
            <Link to="/" className="navbar-brand mr-0 mr-md-2 logo">
              <span className="logo-lg">
                <span className="d-inline h5 ml-2 text-logo">E-Collab</span>
              </span>

            </Link>

            { /* menu*/}
            <ul className="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0">
              <li className="">
                <button className="button-menu-mobile open-left disable-btn" onClick={this.props.openLeftMenuCallBack}>
                  <Menu className="menu-icon" />
                  <X className="close-icon" />
                </button>
              </li>
            </ul>


            <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
              <li className="d-none d-sm-block">
                <div className="app-search">
                  <form>
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search..." />
                      <Search />
                    </div>
                  </form>
                </div>
              </li>


              <NotificationDropdown notifications={Notifications} />


              
            </ul>

          </Container>
        </div>
      </React.Fragment >
    );
  }
}

export default connect(
  null,
)(Topbar);
