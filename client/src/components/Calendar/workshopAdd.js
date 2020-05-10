import React, { Component } from "react";

import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox
} from "availity-reactstrap-validation";
import { Button, Label, Card, CardBody } from "reactstrap";

class workshopAdd extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event, errors, values) {
    console.log(errors);
    console.log(values);
    if (errors.length === 0) {
      //submit
    }
  }

  render() {
    return (
    
        

          <AvForm
            className="av-tooltip tooltip-label-right"
            onSubmit={this.handleSubmit}
          >
            <AvGroup>
              <Label>Name</Label>
              <AvInput name="name" required />
              <AvFeedback>Name is required!</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label>Goals</Label>
              <AvInput name="rank" required />
              <AvFeedback>This is an error!</AvFeedback>
            </AvGroup>
            <AvGroup>
            <Label>Requirement</Label>
            <AvInput name="rank" required />
            <AvFeedback>This is an error!</AvFeedback>
          </AvGroup>
            

            <AvGroup>
              <Label>Description</Label>
              <AvInput type="textarea" name="details" id="details" required />
              <AvFeedback>Please enter some details!</AvFeedback>
            </AvGroup>

          

            <AvCheckboxGroup
              className="error-l-150"
              inline
              name="checkboxCustomInputExample2"
              required
            >
              <Label className="d-block">Certification</Label>
              <AvCheckbox customInput label="Yes" value="Yes" />
              <AvCheckbox customInput label="No" value="No" />
            </AvCheckboxGroup>
            <Button color="primary">Submit</Button>
          </AvForm>
       
    );
  }
}

export default workshopAdd;
