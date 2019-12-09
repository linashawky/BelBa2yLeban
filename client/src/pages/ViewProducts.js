import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from"../components/Sidenav";



class ViewProducts extends Component {
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


    await fetch(`http://localhost:5000/api/buyer/viewProducts/${BID}`,{     
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
    let descript = this.state.descript || [];
    const BID = this.props.match.params.BID;


    return (
      <div className="App">
        <br />
        <SideBar/>
        <h1> Products </h1>
        <br />
        <br />

        {descript.length ? (
          <div>
            {descript.map(el => {
              return (
                <div
                  key={el._id}
                  class="card border-warning mb-3"
                  style={{ width: "800px", margin: "0 auto",clear:"right" }}
                >
                  <h5 class="card-header">{"product ID" + "  " + el._id}</h5>
                  <div class="card-body">
                    <p class="card-text">{"product name:   " + el.productName}</p>
                    <p class="card-text">{"category:   " + el.productCategory}</p>
                    <p class="card-text"> {"Price:   " + el.productPrice}</p>
                    <img src={require("../Images/"+el.src)} style={{width: "8em",hight:"8em",margin:"0 auto",float:"right"}}></img>

                   { <Link to={`/viewProducts/viewProduct/${BID}/${el._id}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                        View the product
                      </Button>
              </Link>}


                  </div>
                  <br />
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
            <SideBar/>
            <h2>No products available</h2>
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
