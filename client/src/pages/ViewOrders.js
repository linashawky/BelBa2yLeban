import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from"../components/Sidenav";


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


    await fetch(`http://localhost:5000/api/buyer/viewOrders/${BID}`,{      headers: new Headers({
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
    let descript = this.state.descript || [];


    return (
      <div className="App">
        <br />
        <SideBar/>
        <h1> My Orders </h1>
        <br />
        <br />
        {descript.length ? (
          <div>
            {descript.map(el => {
              return (
                <div key={el._id} class="card border-warning mb-3" style={{ width: "800px", margin: "0 auto" }}
                >
         
                  <h5 class="card-header">{"products included in order" }</h5>
                  <div class="card-body">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    &nbsp;
                   {
                   el.products.map(el2=> {
                       return( <div key={el.productID}>
                         <h5 style={{ color:"#009688" }}>{"Product Name :  "+el2.productName }</h5>

                         <br/>
                    <br/>
                         </div>)
                   })}
                   {
                 <h2>Total Price: {"     "}{el.totalPrice}</h2>
                   }
                   
                   

                   { <Link to={`/viewOrders/viewOrdertrack/${el._id}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                        View Order details
                      </Button>
              </Link>}
{"         "}

              { <Link to={`/viewOrders/deleteOrder/${el._id}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                        delete Order
                      </Button>
              </Link>}

                  </div>
                  <br />
                  <br />
                  <br />
                </div>
              );
            })}
            

          </div>
        ) : (
          <div>
            <br />
            <h2>No orders yet</h2>
          </div>
        )}

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
export default ViewCart;
