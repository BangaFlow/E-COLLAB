import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as CategoriesActions from "../../../redux/actions/categories.actions"
import { Row } from "reactstrap"
import { Colxx, Separator } from "../../../components/common/CustomBootstrap"

class Stats extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      modalOpen: false,
    }
  }

  componentDidMount() {
    this.props.actions.loadtypeProjects().catch((err) => {
      alert(`error ${err}`)
    })

    let categories = []
    let ps = []
    let count = 0
    let i = 0
    console.log(this.props.location.c)

    this.props.location.c.forEach((element) => {
      categories[i] = element.title
      element.Projects.map((number) => (
        <li key={number.id}>{(count = count + 1)}</li>
      ))
      ps[i] = count
      count = 0
      i = i + 1
      console.log(count)
    })

    console.log(categories)
    console.log(ps)
  }

  statistics = () => {
    let categories = []
    let ps = []
    let count = 0
    let i = 0
    console.log(this.props.categories)

    this.props.categories.forEach((element) => {
      categories[i] = element.title
      element.Projects.map((number) => (
        <li key={number.id}>{(count = count + 1)}</li>
      ))
      ps[i] = count
      i = i + 1
      console.log(count)
    })

    console.log(categories)
    console.log(ps)
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>Statistics</h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row>
          <Colxx xxs="12" className="mb-4">
            <canvas id="myChart" width="100" height="50"></canvas>
          </Colxx>
        </Row>

        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({ categories: state.categories })

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(CategoriesActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats)