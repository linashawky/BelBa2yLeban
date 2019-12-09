import React, { Component } from "react";
import { Button,Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from"../components/Sidenav";


class ViewProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      modalIsOpen: false
    };
  }
  
  

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
    const BID = this.props.match.params.BID;


    return (
      <div className="App">
        <br />
        <SideBar/>
        <h1> Our categories </h1>
        <br />
        <br />
        <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Products Categries
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href={`/buyerHomepage/ViewCategory/${BID}/meat`}>Meat</Dropdown.Item>
    <Dropdown.Item href={`/buyerHomepage/ViewCategory/${BID}/chicken`}>Chicken</Dropdown.Item>
    <Dropdown.Item href={`/buyerHomepage/ViewCategory/${BID}/bread`}>Bread_Bakery</Dropdown.Item>
    <Dropdown.Item href={`/buyerHomepage/ViewCategory/${BID}/sweets`}>sweets</Dropdown.Item>
    <Dropdown.Item href={`/buyerHomepage/ViewCategory/${BID}/fruit`}> Fruits_Vegetables</Dropdown.Item>
    <Dropdown.Item href={`/buyerHomepage/ViewCategory/${BID}/pasta`}>Pasta</Dropdown.Item>
    <Dropdown.Item href={`/buyerHomepage/ViewCategory/${BID}/diary`}>Dairy</Dropdown.Item>
   
  </Dropdown.Menu>
</Dropdown>





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
export default ViewProducts;
