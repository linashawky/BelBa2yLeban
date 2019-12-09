import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SideBar from"../components/Sidenav";


class ViewProduct extends Component {
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
    const Category = this.props.match.params.Category;
    const BID = this.props.match.params.BID;



    await fetch(`http://localhost:5000/api/buyer/viewCategory/${BID}/${Category}`,{      headers: new Headers({
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
    const  descript   = this.state.descript ;
    const BID = this.props.match.params.BID;

    var category=this.props.match.params.Category;
    console.log(descript)

  
    return (
      <div className="App">
        <br />
        <SideBar/>
        <h1> {category}  </h1>
        <br />
        <br />
        {descript.length ? (
          <div>
            {descript.map(el => {
              return (
                  
                <div key={el._id} class="card border-warning mb-3" style={{ width: "800px", margin: "0 auto" }}
                >
                    
                  <h5 class="card-header">{"product name:" + "  " + el.productName}</h5>
                  <div class="card-body">
                    <p class="card-text">{"Product Details:   " + el.productDetails} </p>
                    <p class="card-text">{"In Stock:   " + el.InStock} </p>
                    <p class="card-text"> {"Price:   " + el.productPrice}</p>
                  </div>
                  <br />
                  <br />
                  <br />
                  

        { <Link to={`/viewProducts/AddtoCart/${BID}/${el._id}`}>
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
        <br />
        <br />
        <br />


        </div>
            );
            }
            )
            }
            
          </div>
        ) : (
          <div>
            <br />
            <SideBar/>
            <h2>No products available in this category</h2>
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
        )}

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
export default ViewProduct;
