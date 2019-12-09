import React, { Component } from "react";
import { Button,Container,Row,Image,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from"../components/StaffSidenav"

class staffHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descript: [],
     token:this.props.token,
      visible: true,
      modalIsOpen: false
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
   console.log(this.props.match.params)

    await fetch(`http://localhost:5000/api/Staff/viewMyInfo/${BID}`, {
      method: 'POST',
      headers: new Headers({
        'auth-token':  localStorage.getItem('token')
      })
    })
      .then(res => res.json())
      .then(descript => this.setState({ descript }))
      .catch(error => {
        alert("bizoooooo");
        window.location = "/";
        return error;
     });
    

    // await fetch(`http://localhost:5000/api/Staff/viewMyInfo/${BID}`)
    
    //   .then(res => res.json())
    //   .then(descript => this.setState({ descript }))
    //   .catch(error => {
    //     alert("Your session has expired. Please login again");
    //     window.location = "/";
    //     return error;
    //  });
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
    const { descript  } = this.state;
    const BID = localStorage.getItem('ID');
    console.log(descript)
  
    return (
      <div className="App">
        <SideBar/>
         
        <br />
        <h1 style={{ color:"#009688" }}> WELCOME Staff  </h1>
        <br />
        <br />
      
        <div  class="card border-warning mb-3" style={{width:"800px",margin:"0 auto"}}>
        <h2 class="card-header">{  descript.name}</h2>
                  <div class="card-body">
                    <p class="card-text"> {"email:   " + descript.email}</p>
                    <p class="card-text"> {"PhoneNumber:   " + descript.phoneNumber}</p>
                    <p class="card-text"> {"address:   " + descript.address}</p>

                    </div>
        </div>

        <br />
        <br />
        <br />
        { <Link to={`/StaffHomepage/vieworders/${BID}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                      view avaliable orders
                      </Button>
              </Link>}
{"           "}
              { <Link to={`/StaffHomepage/Myorders/${BID}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                     View My orders
                      </Button>
              </Link>}
              {"           "}
              { <Link to={`/StaffHomepage/Myreviews/${BID}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                     My reviews
                      </Button>
                      
              </Link>}
              <br/>
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
               <br />

<br />
<br />
<br />

<br />
<br />
<br />

<br />
<br />
<br />

<br />
<br />
<br />
<br />
<br />
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
export default staffHomepage;
