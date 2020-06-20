import React, { Component, Fragment } from "react";
import {
    Collapse,
    Button,
    Row, Modal, Col,
    ModalHeader,
    ModalBody,
    ModalFooter, InputGroup,
    InputGroupAddon,
    Input,
    InputGroupText, Label,
    FormGroup, FormText
} from "reactstrap";

import { AvForm, AvField ,AvRadioGroup,AvRadio } from 'availity-reactstrap-validation';

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import * as quizAction from "../../redux/actions/quiz.actions"
import { bindActionCreators } from "redux"
import QuestionDetails from "../../components/Quiz/QuestionDetails"



export class AddQuestions extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            modalOpen: false,
            collapse: false,
            accordion: [true, false, false],
            questions: this.data,
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            answer: '',
            note:"",
            nbQuestion:""
        }
    }
    data = []
    componentDidMount() {
    
        {

            this.props.quiz.map(q => {
                if (q.id === this.props.match.params.id) {
                    console.log(q)
                    if(q.questions !== undefined){
                    q.questions.forEach(q => {
                        this.data.push(q)

                    });}

                }
            })
            this.setState({ questions: this.data })
            console.log(this.state.questions)


        }
    }
    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen,

        });
    };
    toggleAccordion = tab => {
        const prevState = this.state.accordion;
        const state = prevState.map((x, index) => (tab === index ? !x : false));
        this.setState({
            accordion: state
        });
    };

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    };
    toggle1 = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };
    toggle2 = () => {
        this.setState(prevState => ({
            modal2: !prevState.modal2,

        }));

    };
    save = (event, errors, values) => {

        console.log(values)

       
        this.setState({
            nbQuestion :values.nbQuestion

        })
        
        
          const quizInfo={
            nbQuestion : this.state.nbQuestion,
            id:this.props.match.params.id
        
      
          }
          this.props.history.push("/app/questionPageAdd",quizInfo)
      
    }

    
   
   
   

    render() {


        return (
            <Fragment>





                <Row className="app-row survey-app">

                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.question" match={this.props.match} />

                        <div className="float-sm-right">
                            <Button color="primary" className="simple-icon-pencil" outline onClick={this.toggle2}>
                                <IntlMessages id="update" />
                            </Button>
                            
                            
                            <Modal isOpen={this.state.modal2} toggle={this.toggle2}>

                                <ModalHeader toggle={this.toggle2}>
                                    <IntlMessages id="Add Question" />
                                </ModalHeader>
                                <ModalBody>

                                <AvForm  onSubmit={this.save}>
                                <AvField name="nbQuestion" label="number of questions" min="1" type="number" />
                                <Button color="primary" >Next</Button>
                              </AvForm>
                                    
                                          

                                          
                                   </ModalBody>
                                <ModalFooter>
                                    <Button className="justify-content-sm-center" color="primary" >Submit</Button>

                                </ModalFooter>





                            </Modal>
                        </div>




                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Colxx className="text-center">
                    {this.state.questions.map((q, i) => (


                       <QuestionDetails key={q.id} question={q}/>

                    ))}

                </Colxx>
                <Modal isOpen={this.state.modal} toggle={this.toggle1}>
                    <ModalHeader toggle={this.toggle1}>
                        <IntlMessages id="modal.modal-title" />
                    </ModalHeader>
                    <ModalBody>
                        <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">Question</InputGroupAddon>
                            <Input placeholder="question" />
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <span className="input-group-text">
                                    <IntlMessages id="Answer & valisation" />
                                </span>
                            </InputGroupAddon>
                            <Input placeholder="answer" />
                            <Input placeholder="true or false" />
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <span className="input-group-text">
                                    <IntlMessages id="Answer & valisation" />
                                </span>
                            </InputGroupAddon>
                            <Input placeholder="answer" />
                            <Input placeholder="true or false" />
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <span className="input-group-text">
                                    <IntlMessages id="Answer & validation" />
                                </span>
                            </InputGroupAddon>
                            <Input placeholder="answer" />
                            <Input placeholder="true or false" />
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle1}>
                            Update
                                            </Button>{" "}
                        <Button color="secondary" onClick={this.toggle1}>
                            Cancel
                                             </Button>
                    </ModalFooter>
                </Modal>











            </Fragment>
        )
    }
}
AddQuestions.propType = {
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
export default connect(mapStateToProps, mapDispatchtoProps)(AddQuestions);