import React, { useState, Suspense } from "react";
import { connect } from "react-redux";
import swal from "sweetalert";

import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
} from "reactstrap";
import { AvForm, AvField, AvGroup } from "availity-reactstrap-validation";
import { Colxx } from "../../components/common/CustomBootstrap";
import "../../assets/scss/custom-profile-style/style.scss";
import profileImg from "../../assets/images/user/avatar-2.jpg";
import * as profileActions from "../../redux/actions/profile.actions";

const UserBox = ({ userInfo, img, repos, ...props }) => {
  const [edit, setedit] = useState(false);

  const showEdit = () => {
    setedit(!edit);
  };

  const connected_user = JSON.parse(localStorage.getItem("user"));

  return (
    <Suspense fallback={<h1>Loading userbox...</h1>}>
      <Card className="">
        {userInfo && userInfo.user ? (
          <CardBody className="profile-user-box">
            {userInfo.user && userInfo.user.id === connected_user.id && (
              <div
                className="badge badge-dark mr-1 float-right"
                onClick={showEdit}
              >
                Edit
              </div>
            )}

            <EditProfile
              edit={edit}
              showEdit={showEdit}
              profile={userInfo}
              update={props.updateProfile}
              repos={repos}
            />
            <Row>
              <Col>
                <div className="text-center mt-3">
                  <img
                    src={userInfo.image || img || profileImg}
                    alt=""
                    className="avatar-lg rounded-circle"
                  />
                  <h5 className="mt-2 mb-0">{userInfo.user.name}</h5>
                  <h6 className="text-muted font-weight-normal mt-2 mb-0">
                    {userInfo.title}
                  </h6>
                  <h6 className="text-muted font-weight-normal mt-1 mb-4">
                    {userInfo.location}
                  </h6>
                </div>

                <div className="mt-5 pt-2 border-top">
                  <h4 className="mb-3 font-size-15">About</h4>
                  <p>{userInfo.about}</p>
                  <p className="text-muted mb-4"></p>
                </div>

                <div className="mt-3 pt-2 border-top ">
                  <h4 className="mb-3 font-size-15">Contact Information</h4>
                  <div className="table-responsive">
                    <table className="table table-borderless mb-0 text-muted">
                      <tbody>
                        <tr>
                          <th scope="row">Email</th>
                          <td>{userInfo.user.email}</td>
                        </tr>
                        <tr>
                          <th scope="row">Phone</th>
                          <td> {userInfo.phone}</td>
                        </tr>
                        <tr>
                          <th scope="row">Address</th>
                          <td> {userInfo.location} </td>
                        </tr>
                        <tr>
                          <th scope="row">Github</th>
                          <td> {userInfo.github_username} </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        ) : (
          "loading..."
        )}
      </Card>
    </Suspense>
  );
};

const EditProfile = (props) => {
  const { edit, showEdit, profile, update, repos } = props;

  const [phone, setPhone] = useState(profile.phone);
  const [title, setTitle] = useState(profile.title);
  const [location, setLocation] = useState(profile.location);
  const [about, setAbout] = useState(profile.about);
  const [github, setGithub] = useState(profile.github_username);

  const handleSubmit = (event, errors) => {
    if (errors.length === 0) {
      const variables = {
        image: "",
        title,
        location,
        phone,
        about,
        github_username: github,
        profile_id: props.profile.id,
      };
      console.log(variables);
      
      update(variables).then(
        swal("PROFILE UPDATED!", "The profile has been updated!", "success")
      );
      repos(github);
      showEdit();
    }
  };

  return profile ? (
    <div>
      <Modal isOpen={edit} toggle={showEdit} className="modal-lg">
        <ModalHeader toggle={showEdit}>Edit Profile</ModalHeader>
        <AvForm
          className="av-tooltip tooltip-label-right"
          onSubmit={handleSubmit}
        >
          <ModalBody>
            <FormGroup row>
              <Colxx sm={6}>
                <AvGroup className="error-t-negative">
                  <Label>Title *</Label>
                  <AvField
                    name="title"
                    type="text"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
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
              <Colxx sm={6}>
                <AvGroup className="error-l-75 error-t-negative">
                  <Label>Location *</Label>
                  <AvField
                    name="location"
                    type="text"
                    value={location}
                    onChange={(event) => {
                      setLocation(event.target.value);
                    }}
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Please enter your location",
                      },
                    }}
                  />
                </AvGroup>
              </Colxx>
            </FormGroup>
            <AvGroup className="error-t-negative">
              <Label>About *</Label>
              <AvField
                name="about"
                type="textarea"
                value={about}
                onChange={(event) => {
                  setAbout(event.target.value);
                }}
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Please describe yourself",
                  },
                  minLength: {
                    value: 10,
                    errorMessage:
                      "Location must be between 10 and 150 characters",
                  },
                  maxLength: {
                    value: 150,
                    errorMessage:
                      "Location must be between 10 and 150 characters",
                  },
                }}
              />
            </AvGroup>

            <FormGroup row>
              <Colxx sm={6}>
                <AvGroup className="error-l-50 error-t-negative">
                  <Label>Phone *</Label>
                  <AvField
                    name="phone"
                    type="text"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                    validate={{
                      number: {
                        value: true,
                        errorMessage: "Value must be a number",
                      },
                      required: {
                        value: true,
                        errorMessage: "Please enter a number",
                      },
                    }}
                  />
                </AvGroup>
              </Colxx>
              <Colxx sm={6}>
                <AvGroup className="error-l-125 error-t-negative">
                  <Label>Github username *</Label>
                  <AvField
                    name="github_username"
                    type="text"
                    value={github}
                    onChange={(event) => {
                      setGithub(event.target.value);
                    }}
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Please enter your github username",
                      },
                    }}
                  />
                </AvGroup>
              </Colxx>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Save</Button>
            <Button color="secondary" onClick={showEdit}>
              Cancel
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    </div>
  ) : null;
};

const mapStateToProps = (state, ownProps) => ({ profile: state.profile });
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    updateProfile: (variables) =>
      dispatch(profileActions.updateProfile(variables)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);
// export default UserBox;
