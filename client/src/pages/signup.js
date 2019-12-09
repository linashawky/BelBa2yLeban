import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Form } from "react-bootstrap";
import validator from "../validations/validation";
import { RadioGroup, Radio } from "react-radio-group";

function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}

class signUp extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isLoading: false,
      inputList: [],
      type: null,
      name: null,
      password: null,
      email: null,
      phoneNumber: null,
      address: null
    };
  }
  updateName(evt) {
    this.setState({
      name: evt.target.value
    });
  }
  updateAddress(evt) {
    this.setState({
      address: evt.target.value
    });
  }
  updatePassword(evt) {
    this.setState({
      password: evt.target.value
    });
  }
  updateEmail(evt) {
    this.setState({
      email: evt.target.value
    });
  }
  updatePhoneNumber(evt) {
    this.setState({
      phoneNumber: evt.target.value
    });
  }
  updateType(evt) {
    this.setState({
      type: evt.target.value
    });
  }
  async handleSubmit(event) {
    console.log("handled");

    console.log(this.state.type);
    const info = {
      type: this.state.type,
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      address: this.state.city + "-" + this.state.address

    };

    const isValidated = validator.createAccountValidation(info);
    if (isValidated.error) alert(isValidated.error.details[0].message);
    else
    axios({url:`http://localhost:5000/api/login/signup`,
    method: 'post',
    data: info,
    headers: {
      'Content-Type': 'application/json',
      'auth-token':  localStorage.getItem('token')}
  })

        .then(function(response) {
          console.log("user created successfully");
          alert(
            "Congratulations! Your account has been created successfully. Bel Ba2y Leban will contact you soon to activate your account."
          );
          event.preventDefault();
          window.location = "/";
        })
        .catch(function(error) {
          console.log(error);
          alert("Use another email, this email is taken");
        });


        
  }

  handleClick() {
    this.setState({ isLoading: true }, () => {
      simulateNetworkRequest().then(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  handleSelect(eventKey) {
    alert(`selected ${eventKey}`);
    this.setState({ value: eventKey });
  }

  handleChange(e) {
    //console.log(e.target.value);
    //this.setState({ type: e.target.value });
    // this.updateType(e)
    console.log(this.state.type);
  }

  render() {
    return (
      <div>
        <style type="text/css">
          {`
        .btn-flat {
          background-color: orange;
          color: white;
        }
        .btn-xxl {
          padding: 1rem 1.5rem;
          font-size: 1.5rem;
        }
        `}
        </style>
        <br />
        <h1>Create an account</h1>
        <br />
        <h3>Fill in your details </h3>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridType">
              <Form.Label>Account Type</Form.Label>
              <RadioGroup name="type" value={this.state.value}>
                <Radio value="staff" onChange={evt => this.updateType(evt)} />
                Staff
                <Radio value="buyer" onChange={evt => this.updateType(evt)} />
                Buyer
              </RadioGroup>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Enter Name"
              onChange={evt => this.updateName(evt)}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="e.g. belba2yleban@email.com"
                onChange={evt => this.updateEmail(evt)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={evt => this.updatePassword(evt)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder="e.g. street, building"
                onChange={evt => this.updateAddress(evt)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control onChange={evt => this.updatePhoneNumber(evt)} />
          </Form.Group>

          {/* <Form.Group controlId="formGridType">
            <Form.Label>Type</Form.Label>
            <Form.Control onChange={evt => this.updateType(evt)} />
          </Form.Group> */}

          <Button
            variant="flat"
            size="xxl"
            type="button"
            onClick={event => this.handleSubmit(event)}
          >
            Join the family :)
          </Button>
        </Form>
      </div>
    );
  }
}
export default signUp;
