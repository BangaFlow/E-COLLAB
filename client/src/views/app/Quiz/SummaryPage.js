import React, { Component, Fragment } from "react"
import { Button, Card, CardSubtitle, CardBody, CardTitle } from "reactstrap"
import { ceil } from "mathjs"
import { Colxx } from "../../../components/common/CustomBootstrap"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Progress } from "reactstrap"
import * as eventAction from "../../../redux/actions/eventActions"
import { bindActionCreators } from "redux"

import GradientWithRadialProgressCard from "../../../components/cards/GradientWithRadialProgressCard"

export class SummaryPage extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      score: 0,
      numberofQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      nbNoAnswer: 0,
    }
  }
  componentDidMount() {
    const { state } = this.props.location

    this.setState({
      score: (state.score / state.numberofQuestions) * 100,
      numberofQuestions: state.numberofQuestions,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      nbNoAnswer: state.nbNoAnswer,
    })
  }

  handleQuit = () => {
    window.confirm("Are you sure you want to quite?")
    this.props.history.push("/app/Quiz/quizzes")
  }

  render() {
    return (
      <Fragment>
        <CardBody className="center-block    ">
          <Colxx className="mb-4">
            <GradientWithRadialProgressCard
              icon="iconsminds-pen"
              title={` Your Score is `}
              detail=""
              percent={
                (this.props.location.state.score * 100) /
                this.props.location.state.totalScore
              }
              progressText={`${ceil(
                (this.props.location.state.score * 100) /
                  this.props.location.state.totalScore
              )} %`}
            />
          </Colxx>

          <Card>
            <CardBody>
              <CardTitle>Result</CardTitle>
              <CardSubtitle>Correct Answers</CardSubtitle>
              <div className="text-center">
                {this.props.location.state.correctAnswers} of{" "}
                {this.props.location.state.numberofQuestions}
              </div>
              <Progress value={this.props.location.state.correctAnswers} />
              <br></br>
              <CardSubtitle>Wrong Answers</CardSubtitle>
              <div className="text-center">
                {this.props.location.state.wrongAnswers} of{" "}
                {this.props.location.state.numberofQuestions}
              </div>
              <Progress value={this.props.location.state.wrongAnswers} />
              <br></br>
              <CardSubtitle> No Answers</CardSubtitle>
              <div className="text-center">
                {this.props.location.state.nbNoAnswer} of{" "}
                {this.props.location.state.numberofQuestions}
              </div>
              <Progress value={this.props.location.state.nbNoAnswer} />
              <br></br>
              <CardTitle className="text-right">
                {" "}
                <Button
                  className="button-outline"
                  color="primary"
                  onClick={this.handleQuit}
                >
                  Finish
                </Button>
              </CardTitle>
            </CardBody>
          </Card>
        </CardBody>
      </Fragment>
    )
  }
}
SummaryPage.propType = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    event: state.event,
  }
}

function mapDispatchtoProps(dispatch) {
  return { actions: bindActionCreators(eventAction, dispatch) }
}
export default connect(mapStateToProps, mapDispatchtoProps)(SummaryPage)
