import React from 'react';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';
import SkillCard from './skillCard';

const Skills = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}></Col>
            </Row>
            <Card>
                <CardBody>
                    <Row>
                        <Col xs="11">
                            <h4 className="mb-3 mt-0 header-title">Skills</h4>
                        </Col>
                        <Col xs="1" className="text-right">
                            <a href="#" className="card-link text-custom text-right">
                                Add Skill
                            </a>
                        </Col>
                    </Row>
                    <Row className="bg-light p-3">
                        <SkillCard
                            title="Card title"
                            desc="Some quick example text to build on the card title."
                            type="Dapibus ac facilisis in"
                        />
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Skills;
