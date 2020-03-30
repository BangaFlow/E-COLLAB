import React from 'react';
import { Card, CardBody } from 'reactstrap';

const SkillCard = ({ id, title, desc, type }) => {
    return (
        <Card xs={4}>
            <CardBody>
                <h5 className="card-title font-size-16">{title}</h5>
                <p className="card-text text-muted">{desc}</p>
            </CardBody>
            <ul className="list-group list-group-flush  text-muted">
                <li className="list-group-item">{type}</li>
            </ul>
            <CardBody>
                <a href="#" className="card-link text-custom">
                   Update
                </a>
                <a href="#" className="card-link text-custom">
                    Delete
                </a>
            </CardBody>
        </Card>
    );
};

export default SkillCard;
