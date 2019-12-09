import React, { Component } from "react";
import { Link,NavLink } from "react-router-dom";
import axios from "axios";
import { Button, Col, Form } from "react-bootstrap";
import validator from "../validations/validation";
import {BrowserRouter as Router,Redriect,Switch} from 'react-router-dom';


function simulateNetworkRequest() {
  return new Promise(resolve => setTimeout(resolve, 2000));
}



class signIn extends Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.state = {
        isLoading: true,
        type:null,
        id:null,
        inputList: [],
        password: null,
        email: null,
        
      };
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

  async handleSubmit(event) {
    console.log("handled");
    this.setState({ isLoading: true });
    const info = {
      password: this.state.password,
      email: this.state.email,
    
    };


    const isValidated = validator.signInSchema(info);

    if (isValidated.error) alert(isValidated.error.details[0].message);
    else
      await axios
        .post("http://localhost:5000/api/login/signin",info)
        .then(response => {
          console.log("shooooooooooooooooooooooo")
         
          this.setState({ isLoading: false,type:response.data.userType,id:response.data.userID });

          console.log(this.state.type);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('ID', response.data.userID);
          console.log(localStorage.getItem('token'))
        })

        .catch(function(error) {
          console.log(error);
          alert("something went wrong please try again later",error);
        });
       
  }

  handleClick() {
    this.setState({ isLoading: false }, () => {
      /*simulateNetworkRequest().then(() => {
        this.setState({ isLoading: false });
        
      });*/
    });
  }

  handleSelect(eventKey) {
    alert(`selected ${eventKey}`);
    this.setState({ value: eventKey });
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({ city: e.target.value });
  }
  


  render() {
    var load =this.state.isLoading;
    console.log(this.state.isLoading);
    if (load)
{

    return (
      <div className="App" >

        <br />
        <h1 style={{ color:"#009688" }}> Bel Ba2y Leban  </h1>
        <h1 style={{ color:"#009688" }}> Super Market  </h1>
        <img src={require("../Images/cart.png")} style={{position: "absolute", top:"35px",left:"40px",width: "8em",hight:"8em",margin:"0 auto",float:"left"}}></img>
        <br/>
              <br/>
              <br/>


        <div
                  class="card border-success mb-3"
                  style={{ backgroundColor:"#d7f2d8"  ,font:"Times New Roman", fontStyle:"italic", color:"green",width: "700px", margin: "0 auto" }}
                >
                    <p> We aim to be the leading retailer in the Egyptian market by providing <br/>a diverse range of quality goods and services at affordable prices to exceed our customers expectations. 
                        <br/>
                        We will grow profitably to ensure fair financial returns for our stakeholders.</p>
     </div>
<Form> 
<Form.Row>
            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="e.g. belba2yleban@email.com"
                onChange={evt => this.updateEmail(evt)}
              />

            </Form.Group>
            <br/>
            <br/>
            <Form.Group as={Col} controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={evt => this.updatePassword(evt)}
              />
            </Form.Group>

</Form.Row>
<Button className="btn btn-success"
            variant="flat"
            size="xxl"
            type="button"
            onClick={event => this.handleSubmit(event)}
          >
            Let's Shop!
          </Button>
            </Form>
              <br/>
              <br/>
              <br/>

    <a style={{color:"black" ,fontWeight:"bold", fontSize:"3vw"}}>Don't have an account?{"     "}</a> 
              
              { <Link to={`/signup`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                        Sign up now!
                      </Button>
              </Link>}
{"        "}
              { <Link to={`/Googlesignin`}>
                      <Button
                        variant="btn btn-danger"
                        size="lg"
                        color="blue"
                        active
                      >
                        Google Account
                      </Button>
              </Link>}
       
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>



            
        <div
          class="alert alert-success" 
          role="alert"
          style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        >
          Copyright © 2019 Bel Ba2y Leban Inc. All Rights Reserved.{" "}
        </div>
      </div>
    );
  
  }
 if(!load){
   console.log("in elseeeee")
   if(this.state.type==="staff"){
    console.log("hi");
    const BID=this.state.id
     this.props.history.push(`/StaffHomepage/${BID}`)
     console.log(this.props.history)
     return (<div/>);
   }
   else if(this.state.type==="buyer"){
    console.log("hi");
    const BID=this.state.id
     this.props.history.push(`/buyerHomepage/${BID}`)
     console.log(this.props.history)
     return (<div/>);
   }
   else if(this.state.type==="admin"){
     console.log("hiiiiiiiiiiiiiiiiiiiiiii")
     this.props.history.push(`/system/createProduct`)
     console.log(this.props.history)
     return (<div/>);
   }

 }

}
}
export default signIn;
