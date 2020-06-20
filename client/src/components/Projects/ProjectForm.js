import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Select from "react-select"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Row,
  FormGroup,
} from "reactstrap"
import getUsersFetch from "../users/getUsers_fetch"
import { history } from "../../helpers/history"
import { Colxx } from "../../components/common/CustomBootstrap"
import CustomSelectInput from "../../components/common/CustomSelectInput"
import * as CategoriesActions from "../../redux/actions/categories.actions"
import { AvForm, AvField, AvGroup } from "availity-reactstrap-validation"
import "react-datepicker/dist/react-datepicker.css"

class ProjectForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      school_year: "",
      class_involved: "",
      number_of_teams: "",
      number_of_members: "",
      number_of_tutors_per_team: "",
      competence_generate_teams: false,
      learners_choose_teams: false,
      auto_generate_teams: false,
      learners_involved: [],
      tutors_involved: [],
      users: [],
    }
  }

  componentDidMount() {
    getUsersFetch().then((data) =>
      this.setState({ ...this.state, users: data.users })
    )
  }

  str2bool(value) {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "yes") return true
      if (value.toLowerCase() === "no") return false
    }
    return value
  }

  addNetItem = () => {
    let title = this.state.title
    let school_year = this.state.school_year
    let class_involved = this.state.class_involved.value
    //let start_date= this.state.start_date.value;
    //let end_date= this.state.end_date.value;
    let number_of_teams = parseInt(this.state.number_of_teams)
    let number_of_members = parseInt(this.state.number_of_members)
    let number_of_tutors_per_team = parseInt(
      this.state.number_of_tutors_per_team
    )
    let id = this.props.id
    console.log(this.props.id)
    console.log(this.str2bool(this.state.auto_generate_teams.value))
    let auto_generate_teams = this.str2bool(
      this.state.auto_generate_teams.value
    )
    let competence_generate_teams = this.str2bool(
      this.state.competence_generate_teams.value
    )
    let learners_choose_teams = this.str2bool(
      this.state.learners_choose_teams.value
    )
    let learners_involved = this.state.learners_involved.map(user => user.value)
    console.log(learners_involved)
    let tutors_involved = this.state.tutors_involved.map(user => user.value)

    this.props.actions
      .addproject(
        id,
        title,
        school_year,
        class_involved,
        number_of_teams,
        number_of_members,
        number_of_tutors_per_team,
        auto_generate_teams,
        competence_generate_teams,
        learners_choose_teams,
        learners_involved,
        tutors_involved
      )
      .catch((err) => {
        console.log(err)
      })

    this.props.toggleModal()
    this.setState({
      title: "",
      school_year: "",
      class_involved: "",
      number_of_teams: "",
      number_of_members: "",
      number_of_tutors_per_team: "",
      auto_generate_teams: "",
      competence_generate_teams: "",
      learners_choose_teams: "",
      learners_involved: [],
      tutors_involved: []
    })

    setTimeout(() => {
      history.push("/app/projects/categories")
    }, 1000)
  }

  render() {
    const classes = ["second year", "third year", "forth year"]
    const b = ["yes", "no"]

    const { modalOpen, toggleModal } = this.props

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
                <AvForm className="av-tooltip tooltip-label-right">
                  <FormGroup row>
                    <Colxx sm={12}>
                      <AvGroup className="error-t-negative">
                        <Label>Title *</Label>
                        <AvField
                          name="title"
                          type="text"
                          value={this.state.title}
                          onChange={(event) => {
                            this.setState({ title: event.target.value })
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
                        <Label>School Year *</Label>
                        <AvField
                          name="title"
                          type="text"
                          value={this.state.school_year}
                          onChange={(event) => {
                            this.setState({ school_year: event.target.value })
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
                      <Label className="mt-4">Class involved</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        options={classes.map((x, i) => {
                          return { label: x, value: x, key: i }
                        })}
                        value={this.state.class_involved}
                        onChange={(val) => {
                          this.setState({ class_involved: val })
                        }}
                      />
                    </Colxx>
                    <Colxx sm={12}>
                      <AvGroup className="error-t-negative">
                        <Label>Number of Teams *</Label>
                        <AvField
                          name="title"
                          type="text"
                          value={this.state.number_of_teams}
                          onChange={(event) => {
                            this.setState({
                              number_of_teams: event.target.value,
                            })
                          }}
                          validate={{
                            number: {
                              value: true,
                              errorMessage: "Value must be a number",
                            },
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
                        <Label>Number of Memebers Per Teams *</Label>
                        <AvField
                          name="title"
                          type="text"
                          value={this.state.number_of_members}
                          onChange={(event) => {
                            this.setState({
                              number_of_members: event.target.value,
                            })
                          }}
                          validate={{
                            number: {
                              value: true,
                              errorMessage: "Value must be a number",
                            },
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
                        <Label>Number of Tutors Per Teams *</Label>
                        <AvField
                          name="title"
                          type="text"
                          value={this.state.number_of_tutors_per_team}
                          onChange={(event) => {
                            this.setState({
                              number_of_tutors_per_team: event.target.value,
                            })
                          }}
                          validate={{
                            number: {
                              value: true,
                              errorMessage: "Value must be a number",
                            },
                            required: {
                              value: true,
                              errorMessage: "This field is required",
                            },
                          }}
                        />
                      </AvGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <Label className="mt-4">competence_generate_teams</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        options={b.map((x, i) => {
                          return { label: x, value: x, key: i }
                        })}
                        value={this.state.competence_generate_teams}
                        onChange={(val) => {
                          this.setState({ competence_generate_teams: val })
                        }}
                      />
                    </Colxx>

                    <Colxx sm={12}>
                      <Label className="mt-4">learners_choose_teams</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        options={b.map((x, i) => {
                          return { label: x, value: x, key: i }
                        })}
                        value={this.state.learners_choose_teams}
                        onChange={(val) => {
                          this.setState({ learners_choose_teams: val })
                        }}
                      />
                    </Colxx>

                    <Colxx sm={12}>
                      <Label className="mt-4">auto_generate_teams</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        options={b.map((x, i) => {
                          return { label: x, value: x, key: i }
                        })}
                        value={this.state.auto_generate_teams}
                        onChange={(val) => {
                          this.setState({ auto_generate_teams: val })
                        }}
                      />
                    </Colxx>

                    <Colxx sm={12}>
                      <Label className="mt-4">Students Involved</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        isMulti
                        options={
                        this.state.users.filter(user => user.roles.some( role => role.name === "Student")).map((x, i) =>{ 
                          return {label: x.name, value: x.id, key: x.id}
                        })}
                        value={this.state.learners_involved}
                        onChange={(val) => {
                          this.setState({ learners_involved: val })
                        }}
                      />
                    </Colxx>

                    <Colxx sm={12}>
                      <Label className="mt-4">Coachs Involved</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        isMulti
                        options={
                        this.state.users.filter(user => user.roles.some( role => role.name === "Coach")).map((x, i) =>{ 
                          return {label: x.name, value: x.id, key: x.id}
                        })}
                        value={this.state.tutors_involved}
                        onChange={(val) => {
                          this.setState({ tutors_involved: val })
                        }}
                      />
                    </Colxx>
                  </FormGroup>
                  {console.log(this.state.student_involved)}
                  <ModalFooter>
                    <Button color="secondary" outline onClick={toggleModal}>
                      Cancel
                    </Button>
                    <Button color="primary" onClick={() => this.addNetItem()}>
                      Submit
                    </Button>
                  </ModalFooter>
                </AvForm>
              </Colxx>
            </Row>
          </Fragment>
        </ModalBody>
      </Modal>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({ category: state.category })

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(CategoriesActions, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm)
