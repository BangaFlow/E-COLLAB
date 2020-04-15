import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import * as teamsAction from "../../../redux/actions/teams.actions";

import TeamCard from "../../../components/teams/teamCard";

class AllTeams extends Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    this.props.actions.fetchTeams().catch((err) => {
      alert(`error ${err}`);
    });
  }

  render() {
    const { teams } = this.props;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.teams.all" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
        {teams
                ? teams.map((team) => <TeamCard key={team.id} team={team} />)
                : "loading"}
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ teams: state.teams });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(teamsAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTeams);
