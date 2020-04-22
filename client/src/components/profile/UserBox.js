import React from "react";
import { Card, CardBody, Row, Col, Progress } from "reactstrap";

import "../../assets/scss/custom-profile-style/style.scss";
import profileImg from "../../assets/images/user/avatar-2.jpg";

const UserBox = ({ userInfo }) => {
  
  return (
    <Card className="">
      <CardBody className="profile-user-box">
        <Row>
          <Col>
            <div className="text-center mt-3">
              <img
                src={profileImg}
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

              <Progress
                className="mb-4"
                value={60}
                color="success"
                style={{ height: "14px" }}
              >
                <span className="font-size-12 font-weight-bold">
                  Your Profile is <span className="font-size-11">60%</span>{" "}
                  completed
                </span>
              </Progress>

              <button type="button" className="btn btn-primary btn-sm mr-1">
                Follow
              </button>
              <button type="button" className="btn btn-white btn-sm">
                Message
              </button>
            </div>

            <div className="mt-5 pt-2 border-top">
              <h4 className="mb-3 font-size-15">About</h4>
              <p className="text-muted mb-4">{userInfo.about}</p>
            </div>

            <div className="mt-3 pt-2 border-top">
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
                      <td>{userInfo.phone}</td>
                    </tr>
                    <tr>
                      <th scope="row">Address</th>
                      <td>{userInfo.location}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default UserBox;
