import React, { Component, Fragment } from "react";
import {
    Collapse,
    Button,
    Row,
    Card,
    CardSubtitle,
    ButtonGroup,
    CardBody, Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, InputGroup,
    InputGroupAddon,
    Input,
    InputGroupText,
    Badge,
    CardTitle
} from "reactstrap";
import isEmpty from "../Quiz/isEmpty"
import ReactTable from "react-table";

import DataTablePagination from "../../../components/DatatablePagination";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import PropTypes from 'prop-types'
import { connect } from "react-redux";

import * as eventAction from "../../../redux/actions/eventActions"
import { bindActionCreators } from "redux"



export class QuizPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cSelected: [],
            rSelected: null,
            questions: this.data,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            nbofQuestions: 0,
            nbOfAnsweredQuestion: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            time: {
                minutes: 0,
                seconds: 0
            }

        }
        this.interval = null
    }















    data = [
        {
            "question": "What temperature does water boil at?",
            "optionA": "50 degrees Celcius",
            "optionB": "25 degrees Celcius",
            "optionC": "100 degrees Celcius",
            "optionD": "150 degrees Celcius",
            "answer": "100 degrees Celcius"
        },

        {
            "question": "Who wrote Julius Caesar, Macbeth and Hamlet?",
            "optionA": "Wole Soyinka",
            "optionB": "William Shakespeare",
            "optionC": "Ngozi Chimamanda Adichie",
            "optionD": "Dan Brown",
            "answer": "William Shakespeare"
        },

        {
            "question": "What did the crocodile swallow in Peter Pan?",
            "optionA": "A Book",
            "optionB": "A Computer",
            "optionC": "A pair of shoes",
            "optionD": "Alarm Clock",
            "answer": "Alarm Clock"
        },

        {
            "question": "Which is the only mammal that can’t jump?",
            "optionA": "Dog",
            "optionB": "Elephant",
            "optionC": "Goat",
            "optionD": "Lion",
            "answer": "Elephant"
        },

        {
            "question": "Who lived at 221B, Baker Street, London?",
            "optionA": "Tony Stark",
            "optionB": "Morgan Freeman",
            "optionC": "Sherlock Holmes",
            "optionD": "Samuel L. Jackson",
            "answer": "Sherlock Holmes"
        },

        {
            "question": "What colour is a panda?",
            "optionA": "Green and Yellow",
            "optionB": "Blue and Red",
            "optionC": "Green and White",
            "optionD": "Black and White",
            "answer": "Black and White"
        },

        {
            "question": "Where is the smallest bone in the human body?",
            "optionA": "The Chest",
            "optionB": "The Ear",
            "optionC": "The Legs",
            "optionD": "The Hands",
            "answer": "The Ear"
        },

        {
            "question": "What does the roman numeral C represent?",
            "optionA": "100",
            "optionB": "10",
            "optionC": "10,000",
            "optionD": "1,000,000",
            "answer": "100"
        },

        {
            "question": "What takes place in Hong Kong's Happy Valley?",
            "optionA": "Chicken Wrestling",
            "optionB": "Horse racing",
            "optionC": "Street Racing",
            "optionD": "Arm Wrestling",
            "answer": "Horse racing"
        },

        {
            "question": "Who painted the Mona Lisa?",
            "optionA": "Alexander Graham Bell",
            "optionB": "Sir Isaac Newton",
            "optionC": "Leonardo Da Vinci",
            "optionD": "Albert Einstein",
            "answer": "Leonardo Da Vinci"
        },

        {
            "question": "What’s the most important book in the Moslem religion?",
            "optionA": "The Koran",
            "optionB": "The Dictionary",
            "optionC": "The Bible",
            "optionD": "The Chemistry text Book",
            "answer": "The Koran"
        },

        {
            "question": "What’s the capital of Ethiopia?",
            "optionA": "Cape Town",
            "optionB": "San Francisco",
            "optionC": "Abuja",
            "optionD": "Syndey",
            "answer": "Addis Ababa"
        },

        {
            "question": "How many squares are there on a chess board?",
            "optionA": "128",
            "optionB": "64",
            "optionC": "32",
            "optionD": "256",
            "answer": "64"
        },

        {
            "question": "Who invented the electric light bulb?",
            "optionA": "Tom Cruise",
            "optionB": "Barack Obama",
            "optionC": "Wole Soyinka",
            "optionD": "Thomas Edison",
            "answer": "Thomas Edison"
        },

        {
            "question": "What are the first three words of the bible?",
            "optionA": "be with everyone",
            "optionB": "Again Jesus asked",
            "optionC": "In the beginning",
            "optionD": "At that time",
            "answer": "In the beginning"
        }
    ]


    DisplayQuestion = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state

        if (!isEmpty(this.state.questions)) {

            questions = this.state.questions
            console.log(questions)
            currentQuestion = questions[currentQuestionIndex]
            nextQuestion = questions[currentQuestionIndex + 1]
            previousQuestion = questions[currentQuestionIndex - 1]
            const answer = currentQuestion.answer
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                answer
            })

        }
    }

    handleOptionClick = (e) => {
        console.log(e.target.innerHTML)
        console.log(this.state.currentQuestion.answer)
        if (e.target.innerHTML.toLowerCase() === this.state.currentQuestion.answer.toLowerCase()) {
            this.correctAnswer()
            console.log("correct")
        }
        else {
            this.wrongAnswer()
            console.log("wrong")
        }

    }

    componentWillUnmount(){
    clearInterval(this.interval)

    }
    startTimer = () => {
        const countDownTime = Date.now() + 18000  /*18000 3600000*/
        console.log(countDownTime)
        this.interval = setInterval(() => {
            const now = new Date();

            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

            const seconds = Math.floor((distance % (1000 * 60)) / 1000)
            if (distance < 0) {
                clearInterval(this.interval)
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                   this.endGame()
                })
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                })
            }
        }, 1000)

    }




    componentDidMount() {

        const { questions,
            currentQuestion,
            nextQuestion,
            previousQuestion } = this.state

        this.startTimer();
        this.DisplayQuestion(questions, currentQuestion, nextQuestion, previousQuestion)
    }



    correctAnswer = () => {
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            nbOfAnsweredQuestion: prevState.nbOfAnsweredQuestion + 1,


        }), () => {
            if(this.state.nextQuestion === undefined ) {
                this.endGame()
            }else{this.DisplayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion,
                this.state.previousQuestion)
            }
            
        }
        )
    }

    wrongAnswer = () => {
        this.setState(prevState => ({
            score: prevState.score + 1,
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            nbOfAnsweredQuestion: prevState.nbOfAnsweredQuestion + 1,


        }), () => {
            if(this.state.nextQuestion === undefined ) {
                this.endGame()
            }else{this.DisplayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion,
                this.state.previousQuestion)
            }
            
        }
        )

    }

    handleNext = () => {

        if (this.state.nextQuestion !== undefined) {
            this.setState(prevstate => ({
                currentQuestionIndex: prevstate.currentQuestionIndex + 1
            }), () => {
                this.DisplayQuestion(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)


            })

        }
    }
    handlePrev = () => {

        if (this.state.previousQuestion !== undefined) {
            this.setState(prevstate => ({
                currentQuestionIndex: prevstate.currentQuestionIndex - 1
            }), () => {
                this.DisplayQuestion(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)


            })

        }
    }
    handleQuit = () => {
        window.confirm("Are you sure you want to end the quiz ?")
        this.props.history.push("/ResultQuiz", )


    }

    endGame = () => {
        alert("Quiz has ended")
        const {state} =this
        const playStats ={
            score :state.score,
            numberofQuestions :state.questions.length,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            nbNoAnswer :state.questions.length-state.nbOfAnsweredQuestion 
            
        };
        setTimeout(() => {
            this.props.history.push("/ResultQuiz" ,playStats )
        },1000)


    }


    


    render() {
        const { time } = this.state



        return (

            <Fragment>
                <CardBody className="center-block  ">

                    <CardTitle className="mb-4 text-right" >
                        <h3 className="color-theme-1" >{time.minutes}:{time.seconds}<span color="danger" className="iconsminds-clock center-block "></span>
                        </h3>

                    </CardTitle>

                    <CardTitle className="mb-4 text-center" >

                        {this.state.currentQuestion.question}
                    </CardTitle>
                    <Button color="primary" size="lg" block onClick={this.handleOptionClick} value={this.state.currentQuestion.optionA}>{this.state.currentQuestion.optionA}</Button>
                    <Button color="primary" size="lg" block onClick={this.handleOptionClick} value={this.state.currentQuestion.optionB}>{this.state.currentQuestion.optionB}</Button>
                    <Button color="primary" size="lg" block onClick={this.handleOptionClick} value={this.state.currentQuestion.optionC}>{this.state.currentQuestion.optionC}</Button>

                    <br></br>
                    <CardTitle className="mb-4 text-left" >

                        <h3 className="color-theme-1 " >{this.state.nbOfAnsweredQuestion}/{this.state.questions.length}<span color="danger" className="iconsminds-pen"></span>
                        </h3>
                    </CardTitle>
                    <CardTitle className="mb-4 text-center" >
                        <Button outline className="iconsminds-arrow-back-2" onClick={this.handlePrev}></Button>{' '}
                        <Button outline color="danger" className="text-right" onClick={this.endGame} >Submit</Button>{' '}
                        <Button outline className="iconsminds-arrow-next" onClick={this.handleNext}> </Button>
                    </CardTitle>


                </CardBody>



            </Fragment>
        )
    }
}
QuizPage.propType = {
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    debugger
    return {
        event: state.event
    }


};

function mapDispatchtoProps(dispatch) {
    return { actions: bindActionCreators(eventAction, dispatch) }
}
export default connect(mapStateToProps, mapDispatchtoProps)(QuizPage);