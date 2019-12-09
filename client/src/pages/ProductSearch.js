import React, { Component } from "react";
import SideBar from"../components/Sidenav";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios'
import { bool } from "prop-types";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class search extends Component  {

 //------------constructor------------//
  constructor(props){
    super(props);
    this.state = { 
       pname:" ",
       load:true,
       result:[],
       error:null,
    }
}

//-------------methods-------------//

handleChangeName=e=>{
  this.setState({
    pname:e.target.value,

  })
}
changeState=e=>{
    this.setState({load:false})
}

getx = async (e) => {
  const BID = this.props.match.params.BID;


    e.preventDefault();
    let databody ={ pname:this.state.pname}

    console.log(databody)

    axios({
        url: `http://localhost:5000/api/buyer/Productsearch/${BID}`,
        method: 'POST',
        data: databody,
        headers: {
          'auth-token':  localStorage.getItem('token')
      },

      })
        // .then(res=>console.log(res.data))
        .then(result => {
          console.log(result.data[0]);
          this.setState({ result:result.data[0] });
          this.setState({ load: false });
        })
        .catch(err => {
          console.log(err);
        });

    };

   //--------------render function---------------//

  render(){   
        const BID = this.props.match.params.BID;


    var load =this.state.load;   //-----> flag for different returns

      if(load){
        console.log(load)
        return (
            <div>
               
            <form>
              <SideBar />
            
              <h1 style={{ color: "green" }}>Product</h1>
              <input
                style={{ margin: "50px auto", display: "block" }}
                type="text"
                name="pname"
                placeholder="name"
                onChange={this.handleChangeName}
              />
        
        
              <button value="load" onClick={this.getx}   className="btn btn-success">Search</button>

        
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
            </form>
   
        
        </div>
         
            
          );

      }

      if(!load){
          console.log("in elseeeeeeee")
          const  result   = this.state.result;
   if(result===undefined){
    return (
        <div className="App">
          <br />
          <SideBar/>
          <h1> Products details </h1>
          <br />
          <br />

  <h3> Product not found</h3>
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
   else{
          return (
            <div className="App">
              <br />
              <SideBar/>
              <h1> Products details </h1>
              <br />
              <br />
              <div  class="card border-warning mb-3" style={{width:"800px",margin:"0 auto"}}>
              <h2 class="card-header">{"Product name:  " + "  " + result.productName}</h2>
                        <div class="card-body">
                        
                          <p class="card-text">{"details:   " + result.productDetails}</p>
                          <p class="card-text"> {"Category:   " + result.productCategory}</p>
                          <p class="card-text"> {"In stock:   " + result.InStock}</p>
                          <p class="card-text"> {"Price:   " + result.productPrice}</p>
                          <img src={require("../Images/"+result.src)} style={{width: "8em",hight:"8em",margin:"0 auto",float:"right"}}></img>

                          </div>
                          { <Link to={`/viewProducts/AddtoCart/${BID}/${result._id}`}>
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

 
}
}

export default search;
