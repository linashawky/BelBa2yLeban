import React, { Component } from "react";
import { Button,Container,Row,Image,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from"../components/Sidenav"
import axios from'axios';
class buyerHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      el: [],
      visible: true,
      token:this.props.token,
      modalIsOpen: false,
    

    };
  }
  
  componentWillMount() {
    this.getDescription();
  }

  getDescription = async () => {
    if(localStorage.getItem('token')===null)
    {
      window.location = "/";
    }
    else
    {
    const BID = this.props.match.params.BID;

  await fetch(`http://localhost:5000/api/buyer/viewMyInfo/${BID}`,{
    method: 'POST',
    headers: new Headers({
      'auth-token':  localStorage.getItem('token')
    })
  })
  
  .then(res => res.json())
    .then(el => this.setState({ el 
   
    }
      
   
      ))
    .catch(error => {
      alert("Your session has expired. Please login again");
      window.location = "/";
      return error;
   });

  }
 
    
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

    
    const { el  } = this.state;
    const BID = localStorage.getItem('ID');

    console.log(el)
  
    return (
      <div className="App">
          <SideBar />
        <br />
        <h1 style={{ color:"#009688" }}> WELCOME lovely buyer  </h1>
        <br />
        <br />
      
        <div  class="card border-warning mb-3" style={{width:"800px",margin:"0 auto",clear:"right"}}>
        <h2 class="card-header">{el.name}</h2>

                  <div class="card-body">
                    {console.log(el.src)}
                    <img src={require("../Images/june.jpg")} style={{width: "8em",hight:"8em",margin:"0 auto",float:"right"}}></img>

                    <p class="card-text" style={{float:"left"}}> {"email:   " + el.email}</p>
                    <br/>
                    <br/>
                    <p class="card-text" style={{float:"left"}}> {"PhoneNumber:   " + el.phoneNumber}</p>
                    <br/>
                    <br/>
                    <p class="card-text" style={{float:"left"}}> {"address:   " + el.address}</p>


                

    </div>

        </div>

        { <Link to={`/buyerHomepage/viewCart/${BID}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                      view Cart
                      </Button>
              </Link>}
{"           "}
              { <Link to={`/buyerHomepage/viewProducts/${BID}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                      view products
                      </Button>
              </Link>}
              {"           "}
              { <Link to={`/buyerHomepage/viewOrders/${BID}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                      view orders
                      </Button>
                      
              </Link>}
              <br/>
              <br/>
              <br/>

              {"           "}
              { <Link to={`/buyerHomepage/ProductSearch/${BID}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                      product search
                      </Button>
                      
              </Link>}

              {"           "}
              { <Link to={`/buyerHomepage/ViewCategory/${BID}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                      products Category
                      </Button>
                      
              </Link>}
              
              <br/>
              <br/>
              <br/>
              { <Link to={`/`} style={{   position:"absolute", transition: ".5s ease", top: "73%",left: "80%"}}>
                      <Button
                        className="btn btn-info"
                        size="lg"
                        color="blue"
                        active
                       onClick={event=>{localStorage.clear()}}
                      >
                       
                      Log out
                      </Button>
                      
              </Link>}
              <br/>
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
}
export default buyerHomepage;
