
import React, { Component } from "react";
import SideBar from"../components/Sidenav";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios'

class ReviewForm extends Component  {
  constructor(props){
    super(props);
    this.state = { 
    rate:-1,
    review:"",
    load:true,
    result:[],
    error:null,
    }
}

handleChangeRate=e=>{

  this.setState({
    name:e.target.value
  })
}
handleChangeReview=e=>{

  this.setState({
    password:e.target.value
  })
}


    getx = async (e) => {

        e.preventDefault();
        
        let databody ={
        rate:this.state.name,
        review:this.state.password,

    }
    const OID = this.props.match.params.OID;
    console.log(databody)

    axios({url:`http://localhost:5000/api/buyer/ReviewandRate/${OID}`,
         method: 'put',
         data: databody,
         headers: {
             'Content-Type': 'application/json',
         
              'auth-token':  localStorage.getItem('token')

         },
     })
     .then(result => {
      console.log(result.data);
      this.setState({ result:result.data });
      this.setState({ load: false });
    })
     .catch(err=>{console.log(err)})
 
   }

  render(){
    var load =this.state.load; 
    if(load){
      return (
        <div>
        <form>
          <SideBar />
        
          <h1 style={{ color: "green" }}>Review your Order</h1>
          <input
            style={{ margin: "50px auto", display: "block" }}
            type="number"
            name="rate"
            placeholder="rate"
            onChange={this.handleChangeRate}
          />
          <input
            style={{ margin: "50px auto", display: "block" }}
            type="text"
            name="review"
            placeholder="review"
            onChange={this.handleChangeReview}
          />
    
          <button onClick={this.getx}  className="btn btn-warning" >Submit review</button>
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
        </form>
    
    
    </div>
     
        
      );

    }
    if(!load){
      const  result   = this.state.result;
    
      return (
        <div>
        <form>
          <SideBar />
        
          <h1 style={{ color: "green" }}>Rate and review</h1>
    
          <br />
            <br />
    {result}
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
   

}
}

export default ReviewForm;

