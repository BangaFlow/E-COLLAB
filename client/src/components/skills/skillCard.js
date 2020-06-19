import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import swal from "sweetalert";
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

import * as skillsActions from "../../redux/actions/skills.actions";

const Skill = ({ item, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDel, setIsOpenDel] = useState(false);
  const [type, setType] = useState(item.type);
  const [label, setLabel] = useState(item.label);
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
      .updateSkill(item.id, label, description, type)
      .then(
        swal(
          "SKILL UPDATED!",
          "The skill has been updated successfuly",
          "success"
        )
      )
      .catch((err) => {
        console.log(err);
      });
    toggle();
  };

  const handleDelete = () => {
    props.actions.deleteSkill(item.id).catch((err) => {
      console.log(err);
    });
    toggleDel();
  };

  return (
    <Card className="card d-flex mb-3">
      <div className="d-flex flex-grow-1 min-width-zero">
        <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
          <span className="align-middle d-inline-block list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1">
            {item.label}
          </span>
          <div className="w-15 w-xs-100">
            <Badge
              color={item.type === "Technical skill" ? "primary" : "info"}
              pill
              className="float-right"
            >
              {item.type}
            </Badge>
          </div>
        </CardBody>
      </div>

      <div className="card-body pt-1">
        <p className="mb-0">{item.description}</p>
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
      </div>

      <div>
        <Collapse isOpen={isOpenDel}>
          <Card>
            <CardBody>
              Are you sure you want to delete this item?
              <Button
                color="danger"
                size="xs"
                onClick={handleDelete}
                className="float-right"
              >
                Delete
              </Button>
              <Button
                color="info"
                size="xs"
                onClick={toggleDel}
                className="float-right"
              >
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
                  <Label>Label</Label>
                  <Input
                    type="text"
                    name="label"
                    placeholder="Label"
                    value={label}
                    onChange={(e) => {
                      setLabel(e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="textarea"
                    name="desc"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Type</Label>
                  <Input
                    type="select"
                    name="type"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    defaultValue={type}
                  >
                    <option value="Technical skill">Technical skill</option>
                    <option value="Soft skill">Soft skill</option>
                  </Input>
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
  );
};

const mapStateToProps = (state, ownProps) => ({ skills: state.skills });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(skillsActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Skill));
