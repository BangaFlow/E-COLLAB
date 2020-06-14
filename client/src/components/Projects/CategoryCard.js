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
import * as CategoriesActions from "../../redux/actions/categories.actions";
import { Link } from 'react-router-dom'

const Category = ({ item, ...props }) => {

    //const {p} = this.props.location;{this.props.location.p.id}
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);
  
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [methodology, setMethodology] = useState(item.methodology);

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
      .update_Category(item.id, title,description,methodology)
      .catch((err) => {
        console.log(err);
      });
    toggle();
  };

  const handleDelete = () => {
    props.actions.delete_Category(item.id).catch((err) => {
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
              pathname: "/app/projects/allprojects",
              pjcts:  item.Projects,
              id:item.id
                      }}
                      >view projects</Link>
                      
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
                      placeholder="description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                     <Label>Methodology</Label>
                    <Input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={methodology}
                      onChange={(e) => {
                        setMethodology(e.target.value);
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

const mapStateToProps = (state, ownProps) => ({ categories: state.categories });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(CategoriesActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Category));