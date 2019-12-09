import React, { Component } from "react";
import firebase from "firebase";
import{Button} from 'react-bootstrap'
import {Link} from "react-router-dom";
import StyledFirebseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect,BrowserRouter as  Router } from "react-router-dom";

firebase.initializeApp({
  apiKey: "AIzaSyDgadNbzBTwpCBbGtjnK988SbqhzrOov54",
  authDomain: "belba2ylebanacml.firebaseapp.com"
});
class GoogleSignin extends Component {


    state = { isSignedIn: false, name: null, email: null, load: true };
  
  uiConfig = {
    signInFlow: "popup",
    SignInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  };

//   routeChange() {
//     /*let path = `/loadingPage`;
//     this.props.history.push(path);*/
//     window.location.href= "/loadingPage";
//   }

  render() {
    let load = this.state.load;
    if (load) {
      return (
        <div className="App">
          {this.state.isSignedIn ? (
            <div>
              {" "}
              <span>
                <div>Signed In!</div>
                <button onClick={() => firebase.auth().signOut()}>
                  Sign out!
                </button>

                <h1>
                    <br/>
                    <br/>
                  Welcome <br/> {firebase.auth().currentUser.displayName}
                  {
                    (firebase.auth().currentUser.displayName,
                    localStorage.setItem(
                      "currentUserName",
                      firebase.auth().currentUser.displayName
                    ),
                    localStorage.setItem(
                      "currentUserMail",
                      firebase.auth().currentUser.email
                    ),
                    console.log(localStorage.getItem("currentUserName")))
                  }
                </h1>
                <img style={{position: "absolute", top:"35px",left:"60px",width: "8em",hight:"8em",margin:"0 auto",float:"left"}}
                  alt="profile picture"
                  src={firebase.auth().currentUser.photoURL}
                />
                <br/>
<p> You are a part of our family now <br/> we hope you enjoy the shopping experience</p>
   
              </span>
              
            </div>
          ) : (
            <StyledFirebseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
               <div> 
                   <br/><br/><br/><br/><br/><br/>
                   { 
                      <Button
                        variant="btn btn-success"
                        size="lg"
                        color="blue"
                        active
                        onClick={event =>  window.location.href='/loadingPage'}
                      >
                      let's shop now!!
                      </Button>
             
              }
                   <br/><br/><br/><br/><br/><br/>

                </div>
        </div>
        
      );
    } /*else if (!load) {
      // this.props.history.push(`/loadingPage`)
      // return(<div/>)
      return (
        <Router>
          <Redirect from="/" to="/loadingPage"></Redirect>
        </Router>
      );
    }*/
  }
}

export default GoogleSignin;
