import React from "react";
import { Card, CardBody, Badge, CustomInput } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "../../components/common/CustomBootstrap";

const Task = ({ product, handleCheckChange,isSelected }) => {
  return (
    <Colxx xxs="12">
      <Card className="card d-flex mb-3">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
            <NavLink
              to="#"
              id={`toggler${product.id}`}
              className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
            >
               <i
                className={ "simple-icon-refresh heading-icon"
                }
              />
             
              <span className="align-middle d-inline-block">{product.goal}</span>
            </NavLink>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {product.start_date.substring(0,10)}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-xs-100">
              {product.end_date.substring(0,10)}
            </p>
           
          </CardBody>
          <div className="custom-control custom-checkbox pl-1 align-self-center mr-4">
            <CustomInput
              className="itemCheck mb-0"
              type="checkbox"
              id={`check_${product.id}`}
              checked={isSelected}
              onChange={event => handleCheckChange(event, product.id)}
              label=""
            />
          </div>
        </div>
        <div className="card-body pt-1">
          <p className="mb-0">{product.description}</p>
        </div>
      </Card>
    </Colxx>
  );
};

export default React.memo(Task);
