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
import { Link } from 'react-router-dom'

import { Colxx } from "../../components/common/CustomBootstrap";
import * as projectActions from "../../redux/actions/Projects.actions";

const Project = ({ item, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);
  
  const [title, setTitle] = useState(item.title);
  const [school_year, setschool_year] = useState(item.school_year);
  const [class_involved, setclass_involved] = useState(item.class_involved);
  const [number_of_teams, setnumber_of_teams] = useState(item.number_of_teams);
  const [number_of_members, setnumber_of_members] = useState(item.number_of_members);
  const [number_of_tutors_per_team, setnumber_of_tutors_per_team] = useState(item.number_of_tutors_per_team);
  //school_year,class_involved,number_of_teams,number_of_members,number_of_tutors_per_team

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
      .updateProject(item.id,title,school_year,class_involved,number_of_teams,number_of_members,number_of_tutors_per_team)
      .catch((err) => {
        console.log(err);
      });
    toggle();
  };

 

  const handleDelete = () => {
    console.log(item.id);
    props.actions.deleteProject(item.id).catch((err) => {
      console.log(err);
    });
    toggleDel();
    window.location.reload(false);
  };

  return (
    <Colxx xs="12">
      <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <span className="align-middle d-inline-block list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1">
            <p className="font-weight-bold">Title :</p>

              {item.title}
                
              
             
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
          <Button color="success"   className="float-sm-right">
             <Link
                to={{
              pathname: "/app/projects/details",
              pj:item
                      }}
                      >Details</Link>
           
          </Button>
        </div>

        <div>
          <Collapse isOpen={isOpenDel}>
            <Card>
              <CardBody>
                Are you sure you want to delete this item?
                <Button color="danger" size="xs" onClick={handleDelete} >
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

                <Label>school year</Label>
                    <Input
                      type="text"
                      name="school_year"
                      placeholder="school_year"
                      value={school_year}
                      onChange={(e) => {
                        setschool_year(e.target.value);
                      }}
                    />
                      <Label>class involved</Label>
                    <Input
                      type="text"
                      name="class_involved"
                      placeholder="class_involved"
                      value={class_involved}
                      onChange={(e) => {
                        setclass_involved(e.target.value);
                      }}
                    />
                   
                    <Label>number_of_teams</Label>
                    <Input
                      type="text"
                      name="number_of_teams"
                      placeholder="number_of_teams"
                      value={number_of_teams}
                      onChange={(e) => {
                        setnumber_of_teams(e.target.value);
                      }}
                    />
                     <Label>number_of_members</Label>
                    <Input
                      type="text"
                      name="number_of_members"
                      placeholder="number_of_members"
                      value={number_of_members}
                      onChange={(e) => {
                        setnumber_of_members(e.target.value);
                      }}
                    />
                      <Label>number_of_tutors_per_team</Label>
                    <Input
                      type="text"
                      name="number_of_tutors_per_team"
                      placeholder="number_of_tutors_per_team"
                      value={number_of_tutors_per_team}
                      onChange={(e) => {
                        setnumber_of_tutors_per_team(e.target.value);
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

const mapStateToProps = (state, ownProps) => ({ project: state.project });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(projectActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Project));