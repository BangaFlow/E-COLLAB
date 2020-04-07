import React, { useState } from 'react';
import { Card, CardBody, Row, Col, Button } from 'reactstrap';
import { Loader } from 'react-feather';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import SkillCard from './skillCard';
import PreLoaderWidget from '../Loader';
import AddSkill from './addSkill'

const FETCH_ALL_SKILLS = gql`
        query getSkills {
            getSkills {
                id
                label
                description
                type
            }
        }
    `;

const Skills = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    

    const { data, loading, error } = useQuery(FETCH_ALL_SKILLS);

    if (loading) return <PreLoaderWidget />;
    if (error) return <p>ERROR: {error.message}</p>;

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
                            <a href="#" className="card-link text-custom text-right" onClick={toggle}>
                                Add Skill
                            </a>
                        </Col>
                    <AddSkill isOpen={isOpen} />
                    </Row>
                    <Row className="bg-light p-3">
                        {data.getSkills.map(({ id, label, description, type }) => (
                            <SkillCard key={id} title={label} desc={description} type={type} />
                        ))}
                    </Row>

                    <Row className="mb-3 mt-4">
                        <Col>
                            <div className="text-center">
                                <Button color="white">
                                    <Loader className="icon-dual icon-xs mr-2"></Loader>Load more
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default Skills;
