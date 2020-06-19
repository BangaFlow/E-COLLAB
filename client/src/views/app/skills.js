import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Button } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";

import * as skillsActions from "../../redux/actions/skills.actions";
import Skill from "../../components/skills/skillCard";
import SkillForm from "../../components/skills/skillForm";
import { history } from "../../helpers/history";

import SkillMenu from "../../components/skills/skillMenu";

class Skills extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalOpen: false,
    };
  }
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user")) == null) {
      history.push("/auth");
    }
    this.props.actions.loadSkills().catch((err) => {
      alert(`error ${err}`);
    });
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  render() {
    const { skills } = this.props;
    const { modalOpen } = this.state;

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.skills" match={this.props.match} />
            <div className="float-sm-right">
              <Button color="primary" size="lg" onClick={this.toggleModal}>
                Add Skill
              </Button>
            </div>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          {skills
            ? skills.map((skill) => (
                <Colxx xxs="6">
                  <Skill key={skill.id} item={skill} />{" "}
                </Colxx>
              ))
            : "loading"}
        </Row>
        <SkillForm
          toggleModal={this.toggleModal}
          modalOpen={modalOpen}
          title="Add new skill"
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ skills: state.skills });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(skillsActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
