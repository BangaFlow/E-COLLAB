import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: getLoggedInUser()
        };
    }

    render() {

        return (
            <React.Fragment>
                <div className="">
                    { /* preloader */}
                    {this.props.loading && <Loader />}

                    <Row className="page-title align-items-center">
                        <Col sm={4} xl={6}>
                            <h4 className="mb-1 mt-0">Dashboard</h4>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}


export default Dashboard;