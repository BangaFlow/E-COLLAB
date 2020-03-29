import React from 'react';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';




const Skills = () => {

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>

                </Col>
            </Row>
            <Card>
                <CardBody>
                    <h4 className="mb-3 mt-0 header-title">Skills</h4>

                    <Row className="bg-light p-3">
                        <Col xl={3} lg={6}>
                            <Card className="mb-4 mb-xl-0">
                                <CardBody>
                                    <h5 className="card-title font-size-16">Card title</h5>
                                    <p className="card-text text-muted">Some quick example text to build on the card title.</p>
                                </CardBody>
                                <ul className="list-group list-group-flush  text-muted">
                                    <li className="list-group-item">Dapibus ac facilisis in</li>
                                </ul>
                                <CardBody>
                                    <a href="#" className="card-link text-custom">Card link</a>
                                    <a href="#" className="card-link text-custom">Another link</a>
                                </CardBody>
                            </Card>
                        </Col>
                        
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Skills;
