import React, { Component, Fragment } from "react"
import { Button, Row, Modal, ModalHeader, ModalBody } from "reactstrap"

import { AvForm, AvField } from "availity-reactstrap-validation"

import IntlMessages from "../../../helpers/IntlMessages"
import { Colxx, Separator } from "../../../components/common/CustomBootstrap"
import Breadcrumb from "../../../containers/navs/Breadcrumb"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import * as quizAction from "../../../redux/actions/quiz.actions"
import { bindActionCreators } from "redux"
import QuestionDetails from "../../../components/Quiz/QuestionDetails"

export class Questions extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      modal2: false,
      collapse: false,
      accordion: [true, false, false],
      questions: this.data,
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      answer: "",
      note: "",
      nbQuestion: "",
    }
  }
  data = []
  componentDidMount() {
    this.forceUpdate()
    // eslint-disable-next-line
    this.props.quiz.map((q) => {
      if (q.id === this.props.match.params.id) {
        console.log(q)
        if (q.questions !== undefined) {
          q.questions.forEach((q) => {
            this.data.push(q)
          })
        }
      }
    })
    this.setState({ questions: this.data })
    console.log(this.state.questions)
  }

  toggle2 = () => {
    this.setState({
      modal2: !this.state.modal2,
    })
  }

  save = (event, errors, values) => {
    console.log(values)

    this.setState({
      nbQuestion: values.nbQuestion,
    })

    const quizInfo = {
      nbQuestion: this.state.nbQuestion,
      id: this.props.match.params.id,
    }
    this.props.history.push("/app/questionPageAdd", quizInfo)
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.Quizzes" match={this.props.match} />
            <div className="float-sm-right">
              <Button color="primary" size="lg" outline onClick={this.toggle2}>
                Add Question
              </Button>
            </div>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <p>
              <IntlMessages id="All Questions " />
            </p>
          </Colxx>
        </Row>

        <Colxx xxs="12">
          <Colxx className="text-center">
            {this.state.questions.map((p) => (
              <QuestionDetails
                key={p.id}
                question={p}
                idCurrent={this.props.match.params.id}
              />
            ))}
          </Colxx>
        </Colxx>

        <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
          <ModalHeader toggle={this.toggle2}>
            <IntlMessages id="Add Question" />
          </ModalHeader>
          <ModalBody>
            <AvForm onSubmit={this.save}>
              <AvField
                name="nbQuestion"
                label="number of questions"
                type="number"
              />
              <Button color="primary">Next</Button>
            </AvForm>
          </ModalBody>
        </Modal>
      </Fragment>
    )
  }
}
Questions.propType = {
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
export default connect(mapStateToProps, mapDispatchtoProps)(Questions)
