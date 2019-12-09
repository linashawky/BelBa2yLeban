import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios'

class ReviewForm extends Component  {
  constructor(props){
    super(props);
    this.state = { 
      name:" ",
      password:" ",
      phoneNumber:" ",
      address:" ",
      load:true,
      result:[],
       error:null,
    }
}

handleChangeName=e=>{

  this.setState({
    name:e.target.value
  })
}
handleChangePassword=e=>{

  this.setState({
    password:e.target.value
  })
}

handleChangePhoneNumber=e=>{
  this.setState({
    phoneNumber:e.target.value
  })
}

handleChangeAddress=e=>{
  this.setState({
    address:e.target.value
  })
}


    getx = async (e) => {

        e.preventDefault();
        
        let databody ={
        name:this.state.name,
        password:this.state.password,
        phoneNumber:this.state.phoneNumber,
        address:this.state.address
    }
    console.log(databody)
    const BID = this.props.match.params.BID;


    axios({url:`http://localhost:5000/api/buyer/UpdateInfo/${BID}`,
         method: 'put',
         data: databody,
         headers: {
             'Content-Type': 'application/json',
             'auth-token':  localStorage.getItem('token')
         },
     })
     .then(result => {
      console.log(result.data[0]);
      this.setState({ result:result.data });
      this.setState({ load: false });
    })
     .catch(err=>{console.log(err)})
 
   }

  render(){
    var load =this.state.load;   //-----> flag for different returns
if(load){
  return (
    <div>
    <form>
     
    
      <h1 style={{ color: "green" }}>Edit your profile</h1>
      <input
        style={{ margin: "50px auto", display: "block" }}
        type="text"
        name="name"
        placeholder="name"
        onChange={this.handleChangeName}
      />
      <input
        style={{ margin: "50px auto", display: "block" }}
        type="text"
        name="password"
        placeholder="password"
        onChange={this.handleChangePassword}
      />

       <input
        style={{ margin: "50px auto", display: "block" }}
        type="text"
        name="phoneNumber"
        placeholder="phoneNumber"
        onChange={this.handleChangePhoneNumber}
      />

      <input
        style={{ margin: "50px auto", display: "block" }}
        type="text"
        name="address"
        placeholder="address"
        onChange={this.handleChangeAddress}
      />

      <button onClick={this.getx} className="btn btn-success">Submit Changes</button>

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
     
    
      <h1 style={{ color: "green" }}>Edit your profile</h1>

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
