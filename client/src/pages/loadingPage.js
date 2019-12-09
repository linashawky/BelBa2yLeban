import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebseAuth from "react-firebaseui/StyledFirebaseAuth";
import axios from "axios";

class App extends Component {
    state = {
      name: null,
      email:null,
      load:true,
      type:null,
      id:0,
  }
  componentDidMount = () => {
    let dataBody = {
      name: localStorage.getItem("currentUserName"),
      email: localStorage.getItem("currentUserMail")
    };
    console.log(dataBody);

    axios({
      url: 'http://localhost:5000/api/login/googleLogin',
      method: 'POST',
      data: dataBody
    })
      .then(res => {
         //alert("hiiiiiiiiiiiiii")
          console.log(res.data.ID);
          localStorage.setItem('token',res.data.data);
          localStorage.setItem('ID',res.data.ID);
          console.log(localStorage.getItem('token'));
          this.setState({type:res.data.userType,id:res.data.ID,load:false})

    })
      .catch(error => {
        alert("An error occurred please");
        //console.log(error)
        window.location = "/";
        return error;
      });
  };

  render() {
      let load= this.state.load
      
      if(load){
        return(<div> 
        please wait while we gather info
        <br/>
        <p>sorry for the inconvience</p>
        <div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border text-secondary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border text-success" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border text-danger" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border text-warning" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border text-info" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border text-light" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-border text-dark" role="status">
  <span class="sr-only">Loading...</span>
</div>

        </div>);

      }
      if(!load){
        console.log("in elseeeee")
        if(this.state.type==="staff"){
         console.log("hi");
         const BID=this.state.id
          this.props.history.push(`/StaffHomepage/${BID}`)
          console.log(this.props.history)
          return (<div/>);
        }
        else if(this.state.type==="buyer"){
         console.log("hi");
         const BID=this.state.id
          this.props.history.push(`/buyerHomepage/${BID}`)
          console.log(this.props.history)
          return (<div/>);
        }
        else if(this.state.type==="admin"){
          console.log("hiiiiiiiiiiiiiiiiiiiiiii")
          this.props.history.push(`/system/createProduct`)
          console.log(this.props.history)
          return (<div/>);
        }
     
      }

  }
}

export default App;
