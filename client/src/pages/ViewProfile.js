import React, { Component } from "react";
import { Button,Container,Row,Image,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from"../components/Sidenav"


class buyerHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descript: [],
      visible: true,
      modalIsOpen: false
    };
  }
  
  componentWillMount() {
    this.getDescription();
  }

  getDescription = async () => {
   const BID = this.props.match.params.BID;

    await fetch(`http://localhost:5000/api/buyer/viewMyInfo/${BID}`,{    
    method:'POST',
    headers: new Headers({
      'auth-token':  localStorage.getItem('token')
    })})
    
      .then(res => res.json())
      .then(descript => this.setState({ descript }))
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
     });
    
  };
  

  toggleAlert() {
    this.setState({
      visible: !this.state.visible
    });
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  render() {
    const { descript  } = this.state;
    const BID = this.props.match.params.BID;
    console.log(descript)
  
    return (
      <div className="App">

        <br />
        <h1 style={{ color:"#009688" }}> Your Profile </h1>
        <br />
        <br />
      
        <div  class="card border-warning mb-3" style={{width:"800px",margin:"0 auto"}}>
        <h2 class="card-header">{  descript.name}</h2>
                  <div class="card-body">
                    <p class="card-text"> {"email:   " + descript.email}</p>
                    <p class="card-text"> {"PassWord:   " + descript.password}</p>
                    <p class="card-text"> {"PhoneNumber:   " + descript.phoneNumber}</p>
                    <p class="card-text"> {"address:   " + descript.address}</p>

                    </div>
        </div>

              <br/>
              <br/>
              <br/>
              { <Link to={`/EditProfileForm/${BID}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                      Edit Profile
                      </Button>
                      
              </Link>}
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br />



            
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
}
export default buyerHomepage;
