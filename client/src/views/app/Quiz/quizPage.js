import React, { Component, Fragment } from "react";
import {
    Button,
    Container, Col,
    CardBody,
    CardTitle
} from "reactstrap";
import isEmpty from "../Quiz/isEmpty"
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import * as quizAction from "../../../redux/actions/quiz.actions"
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
            quizTime:0,
            time: {
                minutes: 0,
                seconds: 0
            },
            totalScore:0
           
  

        }
        this.interval = null
    }















    data = [

    ]


    DisplayQuestion = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state

        if (!isEmpty(this.state.questions)) {

            questions = this.state.questions

            currentQuestion = questions[currentQuestionIndex]
            

                            
 
            
            nextQuestion = questions[currentQuestionIndex + 1]
            previousQuestion = questions[currentQuestionIndex - 1]
            const answer = currentQuestion.answer
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                answer,
                
             
            })

        }
    }

    handleOptionClick = (e) => {
        console.log(e.target.id)
        console.log(this.state.currentQuestion.answer)
        if (e.target.id.toLowerCase() === this.state.currentQuestion.answer.toLowerCase()) {
            this.correctAnswer()
            console.log("correct")
        }
        else {
            this.wrongAnswer()
            console.log("wrong")
        }

    }

    componentWillUnmount() {
        clearInterval(this.interval)

    }
    startTimer = () => {
        const countDownTime = Date.now() + this.quizTime *60000  /*18000 3600000*/
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



    quizTime = 0
    totalScore=0
    componentDidMount() {

        {
            this.props.quiz.map(q => {
                if (q.id === this.props.match.params.id) {
                    q.questions.forEach(q => {
                        this.data.push(q)

                    });
                    this.quizTime =q.time
                    
                  
                   
                }
            })
        }
        this.data.forEach(q => {
            console.log(q.note)
            this.totalScore =this.totalScore + q.note

        });
        console.log(this.totalScore)
        this.setState({quizTime :this.totalScore})
        this.setState({quizTime :this.quizTime})
        this.setState({ questions: this.data })
        console.log(this.data)
        console.log(this.state.quizTime)

        const { questions,
            currentQuestion,
            nextQuestion,
            previousQuestion,
            
            } = this.state

        this.startTimer();
        this.DisplayQuestion(questions, currentQuestion, nextQuestion, previousQuestion)
       
        
    }



    correctAnswer = () => {
        this.setState(prevState => ({
            score: prevState.score + this.state.currentQuestion.note,
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            nbOfAnsweredQuestion: prevState.nbOfAnsweredQuestion + 1,


        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame()
            } else {
                this.DisplayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion,
                    this.state.previousQuestion)
            }

        }
        )
    }

    wrongAnswer = () => {
        this.setState(prevState => ({
            score: prevState.score ,
            wrongAnswers: prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            nbOfAnsweredQuestion: prevState.nbOfAnsweredQuestion + 1,


        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame()
            } else {
                this.DisplayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion,
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
        this.props.history.push("/app/result")


    }

    endGame = () => {
     window.confirm("do you want to end the Quiz ?")
        console.log(this.totalScore)
        const { state } = this
        const playStats = {
            score: state.score,
            numberofQuestions: state.questions.length,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            nbNoAnswer: state.questions.length - state.nbOfAnsweredQuestion,
            totalScore: this.totalScore

        };
        setTimeout(() => {
            this.props.history.push("/app/result", playStats)
        }, 1000)


    }





    render() {
        const { time } = this.state
       



        return (


            <Fragment>

                <br></br>
                <br></br>
                <Container>
                    <Col sm={{ size: 8, order: 2, offset: 2 }}>

                        <CardBody className="center-block  ">

                            <CardTitle className="mb-4 text-right" >
                                <h3 className="color-theme-1" >{time.minutes}:{time.seconds}<span color="danger" className="iconsminds-clock center-block "></span>
                                </h3>


                            </CardTitle>

                            

                            <CardTitle className="mb-4 text-center" >

                                {this.state.currentQuestion.question}
                            </CardTitle>
                            
                            

                            <Button color="primary" size="lg" id="optionA" hidden={this.state.currentQuestion.optionA === ""} block onClick={this.handleOptionClick} value={this.state.currentQuestion.optionA}>{this.state.currentQuestion.optionA}</Button>
                            <Button color="primary" size="lg"  id="optionB" hidden={this.state.currentQuestion.optionB === ""} block onClick={this.handleOptionClick} value={this.state.currentQuestion.optionB}>{this.state.currentQuestion.optionB}</Button>
                            <Button color="primary" size="lg" id="optionC" hidden={this.state.currentQuestion.optionC === ""} block onClick={this.handleOptionClick} value={this.state.currentQuestion.optionC}>{this.state.currentQuestion.optionC}</Button>
                            <Button color="primary" size="lg"  id="optionD" hidden={this.state.currentQuestion.optionD === ""} block onClick={this.handleOptionClick} value={this.state.currentQuestion.optionD}>{this.state.currentQuestion.optionD}</Button>
                        

                            <br></br>
                            <CardTitle className="mb-4 text-left" >

                                <h3 className="color-theme-1 " >{this.state.nbOfAnsweredQuestion}/{this.state.questions.length}<span color="danger" className="iconsminds-pen"></span>
                                </h3>
                            </CardTitle>
                            <CardTitle className="mb-4 text-center" >

                                <Button outline className="iconsminds-arrow-back-2" onClick={this.handlePrev}></Button>{' '}
                                <Button outline color="primary" className="text-right" onClick={this.endGame} >Submit</Button>{' '}
                                <Button outline className="iconsminds-arrow-next" onClick={this.handleNext}> </Button>

                            </CardTitle>


                        </CardBody>
                    </Col>
                </Container>

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
        quiz: state.quiz
    }


};

function mapDispatchtoProps(dispatch) {
    return { actions: bindActionCreators(quizAction, dispatch) }
}
export default connect(mapStateToProps, mapDispatchtoProps)(QuizPage);