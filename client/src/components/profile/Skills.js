// @flow
import React, { useState } from "react"
import { Row, Col, Card, CardBody, Button, Alert } from "reactstrap"
import "../../assets/scss/custom-profile-style/style.scss"
import classNames from "classnames"
import Loader from "../../helpers/loader"

const Skill = ({ skill }) => {
  return (
    <Card className="border w-100">
      <CardBody>
        {skill.grade < 10 ? (
          <div
            className={classNames("ml-1", "badge", "float-right", {
              "badge-danger": skill.grade < 10,
            })}
          >
            Not Obtained
          </div>
        ) : null}

        <div
          className={classNames("badge", "float-right", {
            "badge-primary": skill.skill.type === "Technical skill",
            "badge-info": skill.skill.type === "Soft skill",
          })}
        >
          {skill.skill.type}
        </div>

        <h5>
          <p className="text-dark">{skill.skill.label}</p>
        </h5>

        <p className="text-muted mb-4">{skill.skill.description}</p>
      </CardBody>
    </Card>
  )
}

const Skills = ({ owned_skills }) => {
  const [state, setstate] = useState({
    limit: 5,
  })

  const [All, setAll] = useState(true)
  const [Obtained, setObtained] = useState(false)
  const [NotObtained, setNotObtained] = useState(false)
  const [Tech, setTech] = useState(false)
  const [Soft, setSoft] = useState(false)

  const Owned = ({ owned_skills }) => {
    return (
      <React.Fragment>
        {owned_skills.slice(0, state.limit).map((item, idx) => {
          return All ? (
            <Row key={idx} className="mt-3">
              <Skill skill={item} />
            </Row>
          ) : Obtained ? (
            item.grade >= 10 ? (
              <Row key={idx} className="mt-3">
                <Skill skill={item} />
              </Row>
            ) : null
          ) : NotObtained ? (
            item.grade < 10 ? (
              <Row key={idx} className="mt-3">
                <Skill skill={item} />
              </Row>
            ) : null
          ) : Tech ? (
            item.skill.type === "Technical skill" ? (
              <Row key={idx} className="mt-3">
                <Skill skill={item} />
              </Row>
            ) : null
          ) : Soft ? (
            item.skill.type === "Soft skill" ? (
              <Row key={idx} className="mt-3">
                <Skill skill={item} />
              </Row>
            ) : null
          ) : null
        })}
      </React.Fragment>
    )
  }

  const LoadMore = () => {
    setstate({
      limit: state.limit + 5,
    })
  }

  // showAll = showAll.bind(this)
  // showObtained = showObtained.bind(this)
  // showNotObtained = showNotObtained.bind(this)
  // showTech = showTech.bind(this)
  // showSoft = showSoft.bind(this)

  function showAll() {
    setAll(true)
    setObtained(false)
    setNotObtained(false)
    setSoft(false)
    setTech(false)
  }
  function showObtained() {
    setAll(false)
    setObtained(true)
    setNotObtained(false)
    setSoft(false)
    setTech(false)
  }
  function showNotObtained() {
    setAll(false)
    setObtained(false)
    setNotObtained(true)
    setSoft(false)
    setTech(false)
  }
  function showTech() {
    setAll(false)
    setObtained(false)
    setNotObtained(false)
    setSoft(false)
    setTech(true)
  }
  function showSoft() {
    setAll(false)
    setObtained(false)
    setNotObtained(false)
    setSoft(true)
    setTech(false)
  }

  return owned_skills && owned_skills.length > 0 ? (
    <React.Fragment>
      <div className="float-right">
        <div className="badge badge-dark mr-1" onClick={showAll}>
          All
        </div>
        <div className="badge badge-success mr-1" onClick={showObtained}>
          Obtained
        </div>
        <div className="badge badge-danger mr-1" onClick={showNotObtained}>
          Not Obtained
        </div>
        <div className="badge badge-primary mr-1" onClick={showTech}>
          Technical Skill
        </div>
        <div className="badge badge-info mr-1" onClick={showSoft}>
          Soft Skill
        </div>
      </div>
      <h5 className="mt-3">Skills</h5>
      <Owned owned_skills={owned_skills} />
      <Row className="mb-3 mt-2">
        <Col>
          <div className="text-center">
            {state.limit < owned_skills.length ? (
              <Button color="white" onClick={LoadMore}>
                <Loader className="icon-dual icon-xs mr-2"></Loader>Load more
              </Button>
            ) : null}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <br />
      <Alert color="warning"> You don't have any skill !!</Alert>
    </React.Fragment>
  )
}

export default Skills
