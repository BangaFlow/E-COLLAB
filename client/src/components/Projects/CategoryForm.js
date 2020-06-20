import React, { Component,Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "react-select";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Row,
  FormGroup,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import * as CategoriesActions from "../../redux/actions/categories.actions";
import CustomSelectInput from "../common/CustomSelectInput";
import { AvForm, AvField, AvGroup } from "availity-reactstrap-validation";

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     title: "",
     description:"",
     methodology:""
      
    };
  }

  addNetItem = () => {
    let title = this.state.title;
    let description= this.state.description;
    let methodology= this.state.methodology.value;
    
   
    this.props.actions.addCategory(title, description,methodology).catch((err) => {
      console.log(err);
    });

    this.props.toggleModal();
    this.setState({
      title: "",
     description:"",
     methodology:""
    });
  };

  render() {
    const meths = ["RAD", "SCRUM"];
    const { modalOpen, toggleModal } = this.props;  

    return (


      
<Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>{this.props.title}</ModalHeader>
        <ModalBody>
     
        <Fragment>
          <Row className="mb-4">
            <Colxx xxs="12">
            

                  <AvForm
                    className="av-tooltip tooltip-label-right"
                    
                  >
                    
                    <FormGroup row>
                      <Colxx sm={12}>
                        <AvGroup className="error-t-negative">
                          <Label>Title *</Label>
                          <AvField
                            name="title"
                            type="text"
                            value={this.state.title}
                            onChange={(event) => {
                              this.setState({ title: event.target.value });
                            }}
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "This field is required",
                              },
                            }}
                          />
                        </AvGroup>
                    </Colxx>
                    <Colxx sm={12}>
                        <AvGroup className="error-t-negative">
                          <Label>Description *</Label>
                          <AvField
                            name="title"
                            type="text"
                            value={this.state.description}
                            onChange={(event) => {
                              this.setState({ description: event.target.value });
                            }}
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "This field is required",
                              },
                            }}
                          />
                        </AvGroup>
                    </Colxx>
                    <Colxx sm={12}>
                    <Label className="mt-4">Methodology</Label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={meths.map((x, i) => {
              return { label: x, value: x, key: i };
            })}
            value={this.state.methodology}
            onChange={(val) => {              
              this.setState({ methodology: val });
            }}
          />
          </Colxx>
                   
                    </FormGroup>
                   
                     
                   
                    <ModalFooter>
                    <Button color="secondary" outline onClick={toggleModal}>Cancel</Button>
                    <Button color="primary" onClick={() => this.addNetItem()}>Submit</Button>
                    </ModalFooter>
                   
                  </AvForm>
                
            </Colxx>
          </Row>
        </Fragment>
      


      </ModalBody>
        
      </Modal>


      
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ category: state.category});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(CategoriesActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);



/*


<Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>{this.props.title}</ModalHeader>
        <ModalBody>
          <Label className="mt-4">Title</Label>
          <Input
            type="text"
            defaultValue={this.state.title}
            onChange={(event) => {
              this.setState({ title: event.target.value });
            }}
            validate={{
              required: {
                value: true,
                errorMessage: "Please enter a title",
              },
            }}
          />
           <Label className="mt-4">Description</Label>
          <Input
            type="text"
            defaultValue={this.state.description}
            onChange={(event) => {
              this.setState({ description: event.target.value });
            }}
            validate={{
              required: {
                value: true,
                errorMessage: "Please enter a Description",
              },
            }}
          />

          <Label className="mt-4">methodology</Label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={meths.map((x, i) => {
              return { label: x, value: x, key: i };
            })}
            value={this.state.methodology}
            onChange={(val) => {              
              this.setState({ methodology: val });
            }}
          />

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => this.addNetItem()}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>



      validation


      
<Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>{this.props.title}</ModalHeader>
        <ModalBody>
     
        <Fragment>
          <Row className="mb-4">
            <Colxx xxs="12">
            

                  <AvForm
                    className="av-tooltip tooltip-label-right"
                    
                  >
                    
                    <FormGroup row>
                      <Colxx sm={12}>
                        <AvGroup className="error-t-negative">
                          <Label>Title *</Label>
                          <AvField
                            name="title"
                            type="text"
                            value={this.state.title}
                            onChange={(event) => {
                              this.setState({ title: event.target.value });
                            }}
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "Please enter your title",
                              },
                            }}
                          />
                        </AvGroup>
                    </Colxx>
                    <Colxx sm={12}>
                        <AvGroup className="error-t-negative">
                          <Label>Description *</Label>
                          <AvField
                            name="title"
                            type="text"
                            value={this.state.description}
                            onChange={(event) => {
                              this.setState({ description: event.target.value });
                            }}
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "Please enter your description",
                              },
                            }}
                          />
                        </AvGroup>
                    </Colxx>

                    
                   
                    </FormGroup>
                   
                     
                   

                    <Button color="primary" onClick={() => this.addNetItem()}>Submit</Button>
                  </AvForm>
                
            </Colxx>
          </Row>
        </Fragment>
      


      </ModalBody>
        
      </Modal>

      */