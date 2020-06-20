import React, { Component } from "react";
import ApplicationMenu from "../common/ApplicationMenu";
import PerfectScrollbar from "react-perfect-scrollbar";

export default class skillMenu extends Component {
  render() {
    return (
      <ApplicationMenu>
        <PerfectScrollbar
          option={{ suppressScrollX: true, wheelPropagation: false }}
        >
          <div className="p-4">
            <p className="text-muted text-small">Status</p>
            <ul className="list-unstyled mb-5">
              <div className="mb-2">
                <i className="simple-icon-reload" />
                All Skills
                <span className="float-right"></span>
              </div>
              <div className="mb-2">
                <i className="simple-icon-reload" />
                Technical Skills
                <span className="float-right"></span>
              </div>
              <div className="mb-2">
                <i className="simple-icon-refresh" />
                Soft Skills
                <span className="float-right"></span>
              </div>
            </ul>
          </div>
        </PerfectScrollbar>
      </ApplicationMenu>
    );
  }
}
