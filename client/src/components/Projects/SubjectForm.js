import React, { Component,Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Row,
  FormGroup,
} from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import * as subjectActions from "../../redux/actions/subjects.actions";
import { history } from "../../helpers/history";
import { AvForm, AvField, AvGroup } from "availity-reactstrap-validation";

class SubjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     title: "",
     description:""
      
    };
  }
     
  addNetItem = () => {
    let title = this.state.title;
    let description= this.state.description;
    //let id= {item.id};
    let id=this.props.id;
    console.log(this.props.id);
    this.props.actions.addsubject(id,title,description).catch((err) => {
      console.log(err);
    });

    this.props.toggleModal();
    this.setState({
      title: "",
      description:""
    });

    setTimeout(() => { history.push("/app/projects/Projects"); }, 1000);
  };

  render() {
    //const classes = ["second year", "third year", "forth year"];
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

const mapStateToProps = (state, ownProps) => ({ subject: state.subject});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(subjectActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectForm);



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



*/