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
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { Link, NavLink } from "react-router-dom";
import QuizPage from "../../views/app/Quiz/quizPage"
import SummaryPage from '../../views/app/Quiz/SummaryPage';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import * as quizAction from "../../redux/actions/quiz.actions"
import { bindActionCreators } from "redux"

class Quiz extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      modalOpen: false,
      current:'',
    
      


    }
  }
 

  

  
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };
  
  handleQuiz = () => {
    this.props.history.push("/app/playQuiz")
  };

  componentDidMount(){

  



  }

  handleDelete = (event) => {
    event.preventDefault()
    this.props.actions.deletequiz(this.props.curentQuiz.id).catch((err) => {
      console.log(err);
    });

   
  };
  render() {
     
        
    return (
      <Fragment>



            
        
              <Row>

                <Colxx xxs="12">
                  <Card className="d-flex flex-row mb-3">
                    <NavLink to={`/app/questions/${this.props.curentQuiz.id}`} className="d-flex">
                      <img alt="Thumbnail" src="/assets/img/quiz.jpg" className="list-thumbnail responsive border-0" />
                    </NavLink>
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                      <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                        <NavLink to={`/app/questions/${this.props.curentQuiz.id}`} className="w-40 w-sm-100">
                          <p className="list-item-heading mb-1 truncate">{this.props.curentQuiz.label}</p>
                        </NavLink>
                        <p className="mb-1 text-muted text-small w-15 w-sm-100">{this.props.curentQuiz.time} minutes</p>
                        <p className="mb-1 text-muted text-small w-15 w-sm-100"></p>
                        <div className="w-15 w-sm-100">
                          <Link to={`/app/play/${this.props.curentQuiz.id}`} className="w-40 w-sm-100">
                            <Badge color="primary" pill >paly Quiz</Badge>{' '}
                          </Link>
                          <Link  to={`/app/play/${this.props.curentQuiz.id}`} className="w-40 w-sm-100">
                          <Badge color="danger " className="simple-icon-trash"  pill outline onClick={this.handleDelete}>Delete</Badge>{' '}
                          </Link>

                        </div>
                      </div>
                      <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">

                      </div>
                    </div>
                  </Card>
                </Colxx>

              </Row>
              </Fragment>
           
    )
  }
}

Quiz.propType = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  debugger
  return {
    quiz: state.quiz
  }


};

function mapDispatchtoProps(dispatch) {
  return { actions: bindActionCreators(quizAction, dispatch) }
}
export default connect(mapStateToProps, mapDispatchtoProps)(Quiz);
