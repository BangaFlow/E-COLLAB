import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Card,
  CardBody,
  Badge,
  Button,
  Collapse,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { Colxx } from "../../components/common/CustomBootstrap";
//import * as CategoriesActions from "../../redux/actions/categories.actions";
import Project from "../../components/Projects/ProjectCard";
import { Link } from 'react-router-dom'
import * as subjectActions from "../../redux/actions/subjects.actions";

const Category = ({ item, ...props }) => {

    //const {p} = this.props.location;{this.props.location.p.id}
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);
  
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  

  const toggle = () => {
    if (isOpenDel == true) toggleDel();
    setIsOpen(!isOpen);
  };

  const toggleDel = () => {
    if (isOpen == true) toggle();
    setIsOpenDel(!isOpenDel);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.actions
      .update_Subject(item.id, title,description)
      .catch((err) => {
        console.log(err);
      });
    toggle();
  };

  const handleDelete = () => {
    props.actions.delete_Subject(item.id).catch((err) => {
      console.log(err);
    });
    toggleDel();
  };

  return (
    <Colxx xs="12">
      <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <span className="align-middle d-inline-block list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1">
              
              {item.title} <br></br>
              {item.description}
              
                
              
            </span>
            
          </CardBody>
        </div>

        <div className="card-body pt-2">
          <Button
            color="danger"
            size="xs"
            className="float-sm-right"
            onClick={toggleDel}
            title="Delete"
          >
            <i className="iconsminds-delete-file" />
          </Button>
          <Button
            color="primary"
            onClick={toggle}
            size="xs"
            className="float-sm-right"
            title="Update"
          >

            <i className="iconsminds-file-edit" />
          </Button>
          <Button
            color="primary"
            
            size="xs"
            className="float-sm-right"
            title="View projects"
          >
             <Link
                to={{
              pathname: "/app/projects/Subjectdetail",
              subjects:item
                      }}
                      >Detail</Link>

          
          </Button>
         
        </div>

        <div>
          <Collapse isOpen={isOpenDel}>
            <Card>
              <CardBody>
                Are you sure you want to delete this item?
                <Button color="danger" size="xs" onClick={handleDelete}>
                  Delete
                </Button>
                <Button color="info" size="xs" onClick={toggleDel}>
                  Cancel
                </Button>
              </CardBody>
            </Card>
          </Collapse>
          <Collapse isOpen={isOpen}>
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>title</Label>
                    <Input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                      <Label>Description</Label>
                    <Input
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </FormGroup>
                 
                  <Button color="secondary" size="s">
                    Update
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      </Card>
    </Colxx>
  );
};

const mapStateToProps = (state, ownProps) => ({ subjects: state.subjects});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(subjectActions, dispatch),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Category));