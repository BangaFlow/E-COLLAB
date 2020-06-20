import React, { Component, Fragment } from "react"
import {
  Button,
  Col,
  Card,
  ModalFooter,
  CardBody,
  CardTitle,
  FormText,
} from "reactstrap"

import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation"

import IntlMessages from "../../../helpers/IntlMessages"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import * as quizAction from "../../../redux/actions/quiz.actions"
import { bindActionCreators } from "redux"

export class QuestionsPage extends Component {
  constructor(props, context) {
    super(props, context)
    this.formRef = React.createRef()
    this.state = {
      optionCValue: "",
      optionDValue: "",
      questions: 0,
      index: 0,
      id: "",
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      answer: "",
      note: "",
      i: 0,
    }
  }

  data = []

  componentDidMount() {
    this.setState({ questions: parseInt(this.props.location.state.nbQuestion) })
    console.log(this.props.location.state.nbQuestion)
    this.data = this.props.quiz
    this.current = this.data.length

    console.log(this.props.quiz)
    console.log(this.props.location.state.id)

    console.log("current  " + this.data[this.current])
  }

  save = (event, errors, values) => {
    console.log("nb qst" + this.state.questions)
    console.log("nb i " + this.state.i)

    this.setState((prevstate) => ({
      question: values.question,
      optionA: values.optionA,
      optionB: values.optionB,
      optionC: values.optionC,
      optionD: values.optionD,
      answer: values.answer,
      note: values.note,
    }))

    if (this.state.i < this.state.questions) {
      this.props.actions
        .addquestion(
          this.props.location.state.id,
          this.state.question,
          this.state.optionA,
          this.state.optionB,
          this.state.optionC,
          this.state.optionD,
          parseInt(this.state.note),
          this.state.answer
        )
        .catch((err) => {
          console.log(err)
        })

      this.setState((prevstate) => ({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        answer: "",
        note: "",

        i: this.state.i + 1,
      }))
    } else {
      this.props.actions
        .addquestion(
          this.props.location.state.id,
          this.state.question,
          this.state.optionA,
          this.state.optionB,
          this.state.optionC,
          this.state.optionD,
          parseInt(this.state.note),
          this.state.answer
        )
        .catch((err) => {
          console.log(err)
        })

      alert("the quiz has end")
      this.props.history.push("/app/questions/" + this.props.location.state.id)
    }
  }
  back = () => {
    this.props.history.push("/app/Quiz/quizzes")
  }

  render() {
    return (
      <Fragment>
        <Card className="mb-4">
          <Col sm={{ size: 8, order: 2, offset: 2 }}>
            <CardBody className="center-block  ">
              <CardTitle className="text-center"> Add Questions </CardTitle>

              <AvForm id="form" onSubmit={this.save}>
                <AvField
                  name="question"
                  label="Question"
                  type="text"
                  value={this.state.question}
                  errorMessage="the question is required"
                  validate={{
                    required: { value: true },
                  }}
                />
                <AvField
                  name="optionA"
                  label="optionA"
                  type="text"
                  value={this.state.optionA}
                  validate={{
                    required: {
                      value: true,
                      errorMessage: "the first option is requirded",
                    },
                  }}
                />

                <AvField
                  name="optionB"
                  label="optionB"
                  type="text"
                  value={this.state.optionB}
                  validate={{
                    required: {
                      value: true,
                      errorMessage: " you need to fill 2 options at least",
                    },
                  }}
                />

                <AvField
                  name="optionC"
                  id="optionC"
                  label="optionC"
                  onChange={(event) => {
                    this.setState({ optionCValue: event.target.value })
                  }}
                  value={this.state.optionC}
                  type="text"
                />

                <AvField
                  name="optionD"
                  onChange={(event) => {
                    this.setState({ optionDValue: event.target.value })
                  }}
                  label="optionD"
                  type="text"
                  value={this.state.optionD}
                />

                <AvRadioGroup
                  inline
                  name="answer"
                  label="Select the correct answer "
                  value={this.state.answer}
                  validate={{
                    required: {
                      value: true,
                      errorMessage: " choose the right answer",
                    },
                  }}
                >
                  <AvRadio label="optionA" value="optionA" />
                  <AvRadio label="optionB" value="optionB" />
                  <AvRadio
                    label="optionC"
                    disabled={this.state.optionCValue !== "" ? false : true}
                    value="optionC"
                  />
                  <AvRadio
                    label="optionD"
                    disabled={this.state.optionDValue !== "" ? false : true}
                    value="optionD"
                  />
                </AvRadioGroup>

                <AvField
                  name="note"
                  label="points"
                  type="number"
                  value={this.state.note}
                />
                <FormText color="muted">Please choose wisely</FormText>

                <ModalFooter>
                  <Button color="secondary" outline onClick={this.back}>
                    <IntlMessages id="cancel" />
                  </Button>
                  <Button color="primary" type="submit">
                    <IntlMessages id="Next" />
                  </Button>{" "}
                </ModalFooter>
              </AvForm>
            </CardBody>
          </Col>
        </Card>
      </Fragment>
    )
  }
}
QuestionsPage.propType = {
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
export default connect(mapStateToProps, mapDispatchtoProps)(QuestionsPage)
