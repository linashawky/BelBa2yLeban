import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from"../components/Sidenav";



class Viewnotification extends Component {
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

    await fetch(`http://localhost:5000/api/buyer/Notify/${BID}`,{
      headers: new Headers({
        'auth-token':  localStorage.getItem('token')
      })
    })
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
    let descript = this.state.descript || [];


    return (
      <div className="App">
        <br />
        <SideBar/>
        <h1> Your notifications </h1>
        <br />
        <br />

        {descript.length ? (
          <div>
            {descript.map(el => {
              return (
                <div
                  class="card border-warning mb-3"
                  style={{ width: "800px", margin: "0 auto",clear:"right" }}
                >
                  <h5 class="card-header">{"Notification"}</h5>
                  <h5 class="card-text">{"message" + "  " + el.notitfication}</h5>
                  {console.log(el)}



                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <br />
            <SideBar/>
            <h2>You have no notifications </h2>
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
          </div>
        )}
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
export default Viewnotification;
