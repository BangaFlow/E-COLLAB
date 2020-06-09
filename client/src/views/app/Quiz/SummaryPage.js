import React, { Component, Fragment } from "react";
import {
    Collapse,
    Button,
    Row,
    Card,
    CardText,
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
import { Progress } from 'reactstrap';
import * as eventAction from "../../../redux/actions/eventActions"
import { bindActionCreators } from "redux"
import RadialProgressCard from "../../../components/cards/RadialProgressCard";

import GradientWithRadialProgressCard from "../../../components/cards/GradientWithRadialProgressCard";


export class SummaryPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

            score: 0,
            numberofQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            nbNoAnswer :0



        }

    }
    componentDidMount() {
        const { state } = this.props.location

        this.setState({
            score: (state.score / state.numberofQuestions) * 100,
            numberofQuestions: state.numberofQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            nbNoAnswer :state.nbNoAnswer,

        })
    }


    handleQuit = () => {
        window.confirm("Are you sure you want to quite?")
        this.props.history.push("/", )


    }







    render() {



       
        return (


            <Fragment>
                <CardBody className="center-block    ">







                    <Colxx className="mb-4">
                        <GradientWithRadialProgressCard
                            icon="iconsminds-pen"
                            title={"Your Score is "}
                            detail={"the total number of questions is "} 
                            percent={(5 * 100) / 12}
                            progressText={this.props.location.state.score}
                        />
                    </Colxx>


                    <Card>

                        <CardBody>
                            <CardTitle>Result</CardTitle>
                            <CardSubtitle>Correct Answers</CardSubtitle>
                            <div className="text-center">{this.props.location.state.correctAnswers} of {this.props.location.state.numberofQuestions}</div>
                            <Progress value={this.props.location.state.correctAnswers} />
                            <br></br>
                            <CardSubtitle>Wrong Answers</CardSubtitle>
                            <div className="text-center">{this.props.location.state.wrongAnswers} of {this.props.location.state.numberofQuestions}</div>
                            <Progress value={this.props.location.state.wrongAnswers}  />
                            <br></br>
                            <CardSubtitle> No Answers</CardSubtitle>
                            <div className="text-center">{this.props.location.state.nbNoAnswer} of {this.props.location.state.numberofQuestions}</div>
                            <Progress value={this.props.location.state.nbNoAnswer}   />
                            <br></br>
                            <Button className="button-outline" onClick={this.handleQuit}>Home</Button>
                        </CardBody>
                    </Card>

                </CardBody>







            </Fragment>
        )
    }
}
SummaryPage.propType = {
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
export default connect(mapStateToProps, mapDispatchtoProps)(SummaryPage);