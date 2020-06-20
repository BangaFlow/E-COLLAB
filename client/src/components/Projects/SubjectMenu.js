import React, { Component } from "react";
import ApplicationMenu from "../common/ApplicationMenu";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavLink } from "react-router-dom";
import { NavItem, Badge } from "reactstrap";

export default class SubjectMenu extends Component {
  render() {
    return (
      <ApplicationMenu>
        <PerfectScrollbar
          option={{ suppressScrollX: true, wheelPropagation: false }}
        >
          <div className="p-4">
            <p className="text-muted text-small">Status</p>
            <ul className="list-unstyled mb-5">
              <div>
                <i className="simple-icon-reload" />
                All Subjects
                <span className="float-right"></span>
              </div>
              <div>
                <i className="simple-icon-refresh" />
                Recommended
                <span className="float-right"></span>
              </div>
              <div>
                <i className="simple-icon-check" />
                Top 10
                <span className="float-right"></span>
              </div>
            </ul>
            
          </div>
        </PerfectScrollbar>
      </ApplicationMenu>
    );
  }
}