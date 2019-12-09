import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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

    await fetch(`http://localhost:5000/api/staff/viewAllOrders/${BID}`,{
      method: 'GET',
      headers: new Headers({
        'auth-token':  localStorage.getItem('token')
      })
    }
)
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
        <h1> Avaliable Orders </h1>
        <br />
        <br />
        {console.log(descript)}
        {descript.length ? (
          <div>
            {descript.map(el => {
              return (
                <div key={el._id} class="card border-warning mb-3" style={{ width: "800px", margin: "0 auto" }}  >
                    
                    <p class="card-text">{"OrderID:   " + el._id}</p>
                  <p class="card-text">{"Order address:   " + el.address}</p>
                  <p class="card-text">{"Number of products:   " + el.products.length}</p>

                <div class="card-body">
                
                   

                   { <Link to={`/viewOrders/ApplyOrder/${BID}/${el._id}`}>
                      <Button
                        variant="btn btn-dark"
                        size="lg"
                        color="blue"
                        active
                      >
                        Apply for this order
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
            <h2>No orders yet</h2>
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


