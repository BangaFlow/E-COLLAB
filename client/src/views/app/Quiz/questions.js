import React, { Component, Fragment } from "react";
import {
    Collapse,
    Button,
    Row,
    Card,
    CardSubtitle,
    CardBody, Modal,
    ModalHeader,
    ModalBody,
    ModalFooter, InputGroup,
    InputGroupAddon,
    Input,
    InputGroupText,
    CardTitle
} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import * as eventAction from "../../../redux/actions/eventActions"
import { bindActionCreators } from "redux"
import Event from "../../../components/Calendar/event"

import AddNewModal from '../../../components/Calendar/AddNewModal'



export class Questions extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            modalOpen: false,
            collapse: false,
            accordion: [true, false, false]
        }
    }
    componentDidMount() {
        this.props.actions.getAllEvent().catch(e => {
            alert(e)
        })
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
            modal2: !prevState.modal2
        }));
    };

    render() {


        return (
            <Fragment>





                <Row className="app-row survey-app">
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.question" match={this.props.match} />
                        
                        <div className="float-sm-right">
                                    <Button color="primary" outline onClick={this.toggle2}>
                                        <IntlMessages id="Add Question" />
                                    </Button>
                                    <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
                                        <ModalHeader toggle={this.toggle2}>
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
                                                        <IntlMessages id="Answer & validation" />
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
                                            <Button color="primary" onClick={this.toggle2}>
                                                Add
                                            </Button>{" "}
                                            <Button color="secondary" onClick={this.toggle2}>
                                                Cancel
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                           


                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Colxx >
                    <Row  >
                    <div className="border">
                            <Button
                                block
                                color="link"
                                className="text-left"
                                onClick={() => this.toggleAccordion(0)}
                                aria-expanded={this.state.accordion[0]}
                            >
                                Question Number #1
                                </Button>
                            <Collapse isOpen={this.state.accordion[0]}>
                                <div className="p-4">
                                React est une bibliothèque JavaScript libre développée par Facebook depuis 2013. Le but principal de cette bibliothèque est de faciliter la création d'application web monopage, via la création de composants dépendant d'un état et générant une page HTML à chaque changement d'état
                                </div>

                                <div className="list-unstyled text-center">

                                    <li>
                                        <p>1. bibliothèque JavaScript </p>
                                    </li>
                                    <li>
                                        <p>2. Framework JavaScript</p>
                                    </li>
                                    <li>
                                        <p>3. platform  JavaScript </p>
                                    </li>

                                </div>


                                <div className="float-sm-right">
                                    <Button color="primary" outline onClick={this.toggle1}>
                                        <IntlMessages id="Update" />
                                    </Button>
                                   
                                </div>
                            </Collapse>
                        </div>
                        </Row>
                        <Row>

                        <div className="border">
                            <Button
                                block
                                color="link"
                                className="text-left"
                                onClick={() => this.toggleAccordion(0)}
                                aria-expanded={this.state.accordion[0]}
                            >
                                Question Number #2
                                </Button>
                            <Collapse isOpen={this.state.accordion[0]}>
                                <div className="p-4">
                                React est une bibliothèque JavaScript libre développée par Facebook depuis 2013. Le but principal de cette bibliothèque est de faciliter la création d'application web monopage, via la création de composants dépendant d'un état et générant une page HTML à chaque changement d'état
                                </div>

                                <div className="list-unstyled text-center">

                                    <li>
                                        <p>1. bibliothèque JavaScript </p>
                                    </li>
                                    <li>
                                        <p>2. Framework JavaScript</p>
                                    </li>
                                    <li>
                                        <p>3. platform  JavaScript </p>
                                    </li>

                                </div>


                                <div className="float-sm-right">
                                    <Button color="primary" outline onClick={this.toggle1}>
                                        <IntlMessages id="Update" />
                                    </Button>
                                   
                                </div>
                            </Collapse>
                        </div>


                    </Row>
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










                <AddNewModal
                    modalOpen={this.state.modalOpen}
                    toggleModal={this.toggleModal} />

            </Fragment>
        )
    }
}
Questions.propType = {
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
export default connect(mapStateToProps, mapDispatchtoProps)(Questions);