import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from"../components/Sidenav";



class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descript: [],
     // PID: this.props.match.params.PID,
      visible: true,
      modalIsOpen: false
    };
  }
  
  componentWillMount() {
    this.getDescription();
  }

  getDescription = async () => {
    const PID = this.props.match.params.PID;
    const BID = this.props.match.params.BID;

    await fetch(`http://localhost:5000/api/buyer/viewProduct/${BID}/${PID}`,{      headers: new Headers({
      'auth-token':  localStorage.getItem('token')
    })})
    
      .then(res => res.json())
      .then(descript => this.setState({ descript:descript }))
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
    //const PID = this.props.match.params.PID;
  
    return (
      <div className="App">
        <br />
        <SideBar/>
        <h1> Products details </h1>
        <br />
        <br />
        <div  class="card border-warning mb-3" style={{width:"800px",margin:"0 auto"}}>
        <h2 class="card-header">{"Product name:  " + "  " + descript.productName}</h2>
                  <div class="card-body">
                  
                    <p class="card-text">{"details:   " + descript.productDetails}</p>
                    <p class="card-text"> {"Category:   " + descript.productCategory}</p>
                    <p class="card-text"> {"In stock:   " + descript.InStock}</p>
                    <p class="card-text"> {"Price:   " + descript.productPrice}</p>




                    </div>
        </div>

        <br />
        <br />
        <br />
        { <Link to={`/viewProducts/AddtoCart/${BID}/${descript._id}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                        Add to cart
                      </Button>
              </Link>}

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
export default ViewProduct;
