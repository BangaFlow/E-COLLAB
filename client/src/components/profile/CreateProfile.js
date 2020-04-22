import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import { AvForm, AvField, AvGroup } from "availity-reactstrap-validation";
import { Colxx } from "../../components/common/CustomBootstrap";
import TopNav from "../../containers/navs/Topnav";

import * as profileActions from "../../redux/actions/profile.actions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      location: "",
      about: "",
      phone: "",
      github_username: "",
      image: "",
    };
  }

  handleSubmit = (event, errors) => {
    const user_id = JSON.parse(localStorage.getItem("user")).id;
    const title = this.state.title;
    const location = this.state.location;
    const about = this.state.about;
    const phone = this.state.phone;
    const github_username = this.state.github_username;
    const image = this.state.image;
    
    if (!errors.length) {
      this.props.actions
        .createProfile(
          image,
          title,
          location,
          phone,
          about,
          github_username,
          user_id
        )
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div>
        <TopNav history={this.props.history} />

        <div className="container" style={{ marginTop: "20vh" }}>
          <Fragment>
            <Row className="mb-4">
              <Colxx xxs="12">
                <Card>
                  <CardBody>
                    <CardTitle>Profile</CardTitle>

                    <AvForm
                      className="av-tooltip tooltip-label-right"
                      onSubmit={this.handleSubmit}
                    >
                      <AvGroup className="error-t-negative">
                        <Label>Image</Label>
                        <AvField
                          name="image"
                          type="file"
                          value={this.state.image}
                          onChange={(event) => {
                            this.setState({ image: event.target.value });
                          }}
                        />
                      </AvGroup>
                      <FormGroup row>
                        <Colxx sm={6}>
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
                        <Colxx sm={6}>
                          <AvGroup className="error-l-75 error-t-negative">
                            <Label>Location *</Label>
                            <AvField
                              name="location"
                              type="text"
                              value={this.state.location}
                              onChange={(event) => {
                                this.setState({ location: event.target.value });
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
                          value={this.state.about}
                          onChange={(event) => {
                            this.setState({ about: event.target.value });
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
                              value={this.state.phone}
                              onChange={(event) => {
                                this.setState({ phone: event.target.value });
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
                            <Label>Github username</Label>
                            <AvField
                              name="github_username"
                              type="text"
                              value={this.state.github_username}
                              onChange={(event) => {
                                this.setState({
                                  github_username: event.target.value,
                                });
                              }}
                            />
                          </AvGroup>
                        </Colxx>
                      </FormGroup>

                      <Button color="primary">Submit</Button>
                    </AvForm>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          </Fragment>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ profile: state.profile });

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(profileActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
