import React, { Component } from "react";
import axios from 'axios';
import SvgIcon from "react-icons-kit";
import {shopping_cart_ok} from 'react-icons-kit/ikons/shopping_cart_ok'
import {shopping_cart_remove} from 'react-icons-kit/ikons/shopping_cart_remove'
import {androidCar} from 'react-icons-kit/ionicons/androidCar'
import {androidCheckboxOutline} from 'react-icons-kit/ionicons/androidCheckboxOutline'
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from"../components/Sidenav";
class ViewOrdertrack extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      OID : this.props.match.params.OID,
      visible: true
    };
  }

  componentDidMount() {
    this.getList();
  }

  toggleAlert() {
    this.setState({
      visible: !this.state.visible
    });
  }


  // Retrieves the list of items from the Express app
  getList = async () => {
    const OID = this.props.match.params.OID;
    axios(`http://localhost:5000/api/buyer/viewOrderTracking/${OID}`,{      headers: new Headers({
      'auth-token':  localStorage.getItem('token')
    })})
      //.then(res => console.log(res.json()))
      .then(list => this.setState( {list:list.data} ));

  };

  render() {
    const  list  = this.state.list || [];
    const OID = this.props.match.params.OID;

    console.log(list);

    if (list==0) {
      return (
<div>        

          <br />
          <SideBar/>
          <h1>Order Tracking </h1>
          <br/>
          <h2>your Order hasn't been approved yet</h2>
          <br/>
           <SvgIcon size={70} icon={shopping_cart_remove} />

          <div
class="alert alert-success"             role="alert"
            style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          >
            Copyright © 2019 BelBa2yLeban Inc. All Rights Reserved.
          </div>
        </div>
      );
    }

     if (
      list==1
    ) {
      return (
        <div className="App">
      
          <br />
          <SideBar/>
          <h1>Order Tracking </h1>
          <br/>
          <h2> your order is approved and will be delivered soon </h2>
          <SvgIcon size={70} icon={shopping_cart_ok} />

          <br/>       <br/>       <br/>       <br/>       <br/>       <br/>       
          <br/>       <br/>       <br/>       <br/>       <br/>       <br/>     
          <br/>       <br/>       <br/>       <br/>       <br/>       <br/>

          <div
class="alert alert-success"             role="alert"
            style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          >
            Copyright © 2019 BelBa2yLeban Inc. All Rights Reserved.
          </div>
        </div>
      );
    }
   if (
      list==2
    ) {
      return (
        <div>

<br />
          <SideBar/>
          <div>
          <h1>Order Tracking </h1>
          <br/>
          <br/>
          <h2>your order is on the way</h2>
          <br/>
          <br/>
          <SvgIcon size={70} icon={shopping_cart_ok} />
          {"   "}
          <SvgIcon size={70} icon={androidCar} />
          </div>

          <div
class="alert alert-success"             role="alert"
            style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          >
            Copyright © 2019 BelBa2yLeban Inc. All Rights Reserved.
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="App">

          <br />
          <SideBar/>
          <h1>Order Tracking </h1><br/>
          <br/>
          <br/>
          <br/>
          <h2> your order has been completed</h2>
          <br/>
          <br/>
          <SvgIcon size={70} icon={shopping_cart_ok} />
          {"   "}
          <SvgIcon size={70} icon={androidCar} />
          {"   "}
          <SvgIcon size={70} icon={androidCheckboxOutline} />
          <br/>
          <Link to={`/viewOrders/viewOrdertrack/RatReviewOrder/${OID}`}>
    <Button
      variant="btn btn-dark"
      size="lg"
      color="blue"
      active
    >
     rate and review Order
    </Button>
    </Link>
    <br />  <br />  <br />  <br />


          <div
class="alert alert-success"             role="alert"
            style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          >
            Copyright © 2019 BelBa2yLeban Inc. All Rights Reserved.
          </div>
        </div>
      );
    }

  }
}

export default ViewOrdertrack;
