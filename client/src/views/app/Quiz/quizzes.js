import React, { Component, Fragment } from "react";
import {
  Row,
  Card, Button,
  CustomInput,
  Badge
  , Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, FormText
} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Link, NavLink } from "react-router-dom";
import QuizPage from "../Quiz/quizPage"
import SummaryPage from '../Quiz/SummaryPage';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import * as quizAction from "../../../redux/actions/quiz.actions"
import { bindActionCreators } from "redux"
import AddModal from  '../../../components/Quiz/AddModal';
import Quiz from  '../../../components/Quiz/Quiz';
class Quizzes extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalOpen: false,
    
      


    }
  }
 

  

  componentDidMount() {

    this.props.actions.getAllQuizzes().catch(e => {
      alert(e)
    })
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };
  

  handleQuiz = () => {
    this.props.history.push("/app/playQuiz")
  };
  render() {

    return (
      <Fragment>




        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.Quizzes" match={this.props.match} />
            <div className="float-sm-right">
              <Button color="primary" size="lg" outline onClick={this.toggleModal}>
                New Quiz
                </Button>
            </div>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <p><IntlMessages id="menu.Quizzes" /></p>
          </Colxx>
        </Row>
        <Row>


          <Colxx xxs="12">
            {this.props.quiz.map(quiz => (

             
              <Quiz key={quiz.id} curentQuiz={quiz}/>
            ))}
          </Colxx>

        </Row>
        <AddModal
        modalOpen={this.state.modalOpen}
        toggleModal={this.toggleModal} />

      </Fragment>
    )
  }
}

Quizzes.propType = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  
  return {
    quiz: state.quiz
  }


};

function mapDispatchtoProps(dispatch) {
  return { actions: bindActionCreators(quizAction, dispatch) }
}
export default connect(mapStateToProps, mapDispatchtoProps)(Quizzes);
