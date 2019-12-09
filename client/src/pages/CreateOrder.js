import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from"../components/Sidenav";


class CreatOrder extends Component {
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


    await fetch(`http://localhost:5000/api/buyer/CreateOrder/${BID}`,{method: 'POST',
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
    
    
  
    return (
      <div className="Create Order">
        <br />
        <SideBar/>
        <h1>Create Order  </h1>
        <br />
        <br />
{descript}

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
        <br />
        <br />
        <br />
        <br />





        <div
class="alert alert-success"           role="alert"
          style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        >
          Copyright © 2019 Bel Ba2y Leban Inc. All Rights Reserved.{" "}
        </div>
      </div>
    );
  }

}
export default  CreatOrder;
