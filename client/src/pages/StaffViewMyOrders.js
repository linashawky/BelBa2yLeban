import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SvgIcon from "react-icons-kit";
import {shopping_cart_ok} from 'react-icons-kit/ikons/shopping_cart_ok'
import {shopping_cart_remove} from 'react-icons-kit/ikons/shopping_cart_remove'
import {androidCar} from 'react-icons-kit/ionicons/androidCar'
import {androidCheckboxOutline} from 'react-icons-kit/ionicons/androidCheckboxOutline'
import SideBar from"../components/StaffSidenav"

class ViewCart extends Component {
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

  
    await fetch(`http://localhost:5000/api/staff/viewOrders/${BID}`, {
      method:'GET',
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
    const BID = this.props.match.params.BID;


    return (
      <div className="App">
        <SideBar/>
        <br />
        <h1>your orders </h1>
        <br />
        <br />
        {descript.length ? (
          <div>
            {descript.map(el => {
              if( el.orderTracking[0] ===false)
              return (
                <div key={el._id} class="card border-warning mb-3" style={{ width: "800px", margin: "0 auto" }}  >
                    
                    <p class="card-text">{"OrderID:   " + el._id}</p>
                  <p class="card-text">{"Order address:   " + el.orderAddress}</p>
                  <p class="card-text">{"Number of products:   " + el.products.length}</p>
                  <br />
                
         
                  <br />

          <br/>
          <h2>your Order hasn't been approved yet</h2>
          <br/>
           <SvgIcon size={70} icon={shopping_cart_remove} />

              <div class="card-body">

            

                  </div>
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
                </div>
              );

              else
              if(el.orderTracking[0]===true && el.orderTracking[1]=== false && el.orderTracking[2]===false)

              return (
                <div key={el._id} class="card border-warning mb-3" style={{ width: "800px", margin: "0 auto" }}  >
                    
                    <p class="card-text">{"OrderID:   " + el._id}</p>
                  <p class="card-text">{"Order address:   " + el.orderAddress}</p>
                  <p class="card-text">{"Number of products:   " + el.products.length}</p>
                  <br />

          <h2> your order is approved and will be delivered soon </h2>
          <SvgIcon size={70} icon={shopping_cart_ok} />

       

              <div class="card-body">
              
              { <Link to={`/updateOnTheWay/${BID}/${el._id}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                        click when u start delivering
                      </Button>
              </Link>}
            

                  </div>
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
                </div>
              );
             
             
          else
          if(el.orderTracking[0]===true && el.orderTracking[1]===true && el.orderTracking[2]===false)

          return (
            <div key={el._id} class="card border-warning mb-3" style={{ width: "800px", margin: "0 auto" }}  >
                
                <p class="card-text">{"OrderID:   " + el._id}</p>
              <p class="card-text">{"Order address:   " + el.orderAddress}</p>
              <p class="card-text">{"Number of products:   " + el.products.length}</p>
              <br />
             <br />
     
          <br/>
          <h2>your order is on the way</h2>
          <br/>
          <br/>
          <SvgIcon size={70} icon={shopping_cart_ok} />
          {"   "}
          <SvgIcon size={70} icon={androidCar} />
          <div class="card-body">
         
         
          { <Link to={`/updateOnComplete/${BID}/${el._id}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                        click when u complete the delivery
                      </Button>
              </Link>}
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

              </div>
              <br />
              </div>
          );
          else
          if(el.orderTracking[0]===true && el.orderTracking[1]===true && el.orderTracking[2]===true)

          return (
            <div key={el._id} class="card border-warning mb-3" style={{ width: "800px", margin: "0 auto" }}  >
                
                <p class="card-text">{"OrderID:   " + el._id}</p>
              <p class="card-text">{"Order address:   " + el.orderAddress}</p>
              <p class="card-text">{"Number of products:   " + el.products.length}</p>
              <br />
            
          <br/>
          <h2> your order has been completed</h2>
          <br/>
          <br/>
          <SvgIcon size={70} icon={shopping_cart_ok} />
       
          <SvgIcon size={70} icon={androidCar} />
      
          <SvgIcon size={70} icon={androidCheckboxOutline} />
          <br/>
          <div class="card-body">
        </div>
              <br />
      
            </div>
          );
  })}
            

          </div>
        ) : (
          <div>
            <br />
            <h2>you arenot assigned to any order yet</h2>
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
export default ViewCart;
