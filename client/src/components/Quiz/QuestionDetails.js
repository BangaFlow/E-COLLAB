import React, { Component, Fragment } from "react"
import { Button, Col, CardBody, CardTitle, Container } from "reactstrap"

import { Redirect } from "react-router-dom"
import { Separator } from "../../components/common/CustomBootstrap"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import * as quizAction from "../../redux/actions/quiz.actions"
import { bindActionCreators } from "redux"
import UpdateQuiz from "./UpdateQuiz"

export class QuestionDetails extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      modalOpen: false,
      collapse: false,
      accordion: [true, false, false],
      redirect: false,
    }
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    })
  }

  componentDidMount() {}

  handleDelete = (event) => {
    event.preventDefault()
    const id = this.props.question.id
    this.props.actions
      .deletequestion(id)
      .then((res) => this.props.history.push(`app/questions/${id}`))
      .catch((err) => {
        console.log(err)
      })

    this.setState({ redirect: true })
  }

  render() {
    return this.state.redirect ? (
      <Redirect to={"app/questions/" + this.props.question.id} />
    ) : (
      <Fragment>
        <br></br>

        <Container>
          <Col sm={{ size: 8, order: 2, offset: 2 }}>
            <CardBody className="center-block  ">
              <CardTitle className="mb-4 text-left">
                <div className="position-absolute card-top-buttons">
                  <Button
                    outline
                    color="primary"
                    className="icon-button"
                    onClick={this.toggleModal}
                  >
                    <i className="simple-icon-pencil" />
                  </Button>
                  <Button
                    outline
                    color="primary"
                    className="icon-button"
                    onClick={this.handleDelete}
                  >
                    <i className="simple-icon-trash" />
                  </Button>
                </div>
              </CardTitle>
              <br></br>

              <CardTitle className="mb-4 text-center">
                {this.props.question.question}
              </CardTitle>

              <Button
                color="primary"
                size="lg"
                disabled
                hidden={this.props.question.optionA === ""}
                block
                outline={this.props.question.answer !== "optionA" ? true : false}
                value={this.props.question.optionA}
              >
                {this.props.question.optionA}{" "}
              </Button>
              <Button
                color="primary"
                size="lg"
                disabled
                hidden={this.props.question.optionB === ""}
                block
                outline={this.props.question.answer !== "optionB" ? true : false}
                value={this.props.question.optionB}
              >
                {this.props.question.optionB}{" "}
              </Button>
              <Button
                color="primary"
                size="lg"
                disabled
                hidden={this.props.question.optionC === ""}
                block
                outline={this.props.question.answer !== "optionC" ? true : false}
                value={this.props.question.optionA}
              >
                {this.props.question.optionC}{" "}
              </Button>
              <Button
                color="primary"
                size="lg"
                disabled
                hidden={this.props.question.optionD === ""}
                block
                outline={this.props.question.answer !== "optionD" ? true : false}
                value={this.props.question.optionD}
              >
                {this.props.question.optionD}{" "}
              </Button>

              <br></br>
            </CardBody>
          </Col>
        </Container>
        <br></br>
        <Separator className="mb-5" />

        <UpdateQuiz
          modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal}
          question={this.props.question}
        />
      </Fragment>
    )
  }
}
QuestionDetails.propType = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    quiz: state.quiz,
  }
}

function mapDispatchtoProps(dispatch) {
  return { actions: bindActionCreators(quizAction, dispatch) }
}
export default connect(mapStateToProps, mapDispatchtoProps)(QuestionDetails)
