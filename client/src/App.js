import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
//-------------welcome pages------------//
import welcome from "./pages/welcomePage";
import signup from "./pages/signup"
import GoogleSignin from "./pages/GoogleSignin"
import loadingPage from "./pages/loadingPage"

//--------------buyer pages----------------//

import ViewProducts from "./pages/ViewProducts";
import ViewProduct from "./pages/ViewProduct";
import AddtoCart from "./pages/AddtoCart";
import viewCart from "./pages/ViewCart";
import buyerHomepage from "./pages/buyerHomepage";
import DeleteFromCart from "./pages/DeleteFromCart";
import CreateOrder from "./pages/CreateOrder";
import ViewOrders from "./pages/ViewOrders";
import ViewOrdertrack from "./pages/ViewOrdertrack";
import RateAndReviewStaff from "./pages/RateAndReviewStaff";
import deleteOrder from "./pages/DeleteOrder";
import EditProfileForm from "./pages/EditProfileForm";
import viewCategory from"./pages/ViewCategory";
import viewspecificCategory from"./pages/ViewspecificCategory";
import ViewProfile from"./pages/ViewProfile";
import ProductSearch from "./pages/ProductSearch";
import notification from "./pages/notification";
//---------admin page----------------------//
import CreateProduct from "./pages/CreateProduct";
//------------staff pages-------------------//
import StaffHomepage from"./pages/StaffHomepage.js";
 import StaffViewOrders from"./pages/StaffViewOrders";
 import StaffApplyForOrder from"./pages/StaffApplyForOrder";
 import StaffViewMyOrders from"./pages/StaffViewMyOrders";
 import StaffViewReviews from"./pages/StaffViewReview";
 import StaffUpdateOntheWay from "./pages/StaffUpdateOntheway";
 import Staffupdatewhencomplete from "./pages/Staffupdatewhencomplete";

class App extends Component {
  componentWillMount() {
    document.title = "Bel Ba2y Leban";
  }

  render() {
    return (
      <Router>
        <div className="App">

      <Route exact path="/" component={welcome}/>
      <Route exact path="/signup" component={signup}/>
      <Route exact path="/Googlesignin" component={GoogleSignin}/>
      <Route exact path="/loadingPage" component={loadingPage}/>

      <Route exact path="/system/createProduct" component={CreateProduct}/>

      <Route exact path="/buyerHomepage/viewProducts/:BID" component={ViewProducts}/>
      <Route exact path="/viewProducts/viewProduct/:BID/:PID" component={ViewProduct} />
      <Route exact path="/viewProducts/AddtoCart/:BID/:PID" component={AddtoCart}/>
      <Route exact path="/buyerHomepage/:BID" component={buyerHomepage}/>
      <Route exact path="/buyerHomepage/viewCart/:BID" component={viewCart}/>
      <Route exact path="/buyerHomepage/viewOrders/:BID" component={ViewOrders}/>
      <Route exact path="/ViewProfile/:BID" component={ViewProfile}/>
     <Route exact path="/viewCart/DeletefromCart/:BID/:PID" component={DeleteFromCart}/>
      <Route exact path="/viewOrders/viewOrdertrack/:OID" component={ViewOrdertrack} />
      <Route exact path="/CreateOrder/:BID" component={CreateOrder} />
      <Route exact path="/viewOrders/viewOrdertrack/RatReviewOrder/:OID" component={RateAndReviewStaff} />
      <Route exact path="/viewOrders/deleteOrder/:OID" component={deleteOrder}/>
     <Route exact path="/EditProfileForm/:BID" component={EditProfileForm}/>
     <Route exact path="/buyerHomepage/ViewCategory/:BID" component={viewCategory}/>
     <Route exact path="/buyerHomepage/ViewCategory/:BID/:Category" component={viewspecificCategory}/>
     <Route exact path="/buyerHomepage/ProductSearch/:BID" component={ProductSearch}/>
     <Route exact path="/notifications/:BID" component={notification}/>



  <Route exact path="/StaffHomepage/:BID" component={StaffHomepage}/>   
  <Route exact path="/StaffHomepage/vieworders/:BID" component={StaffViewOrders} />       
  <Route exact path="/viewOrders/ApplyOrder/:BID/:OID" component={StaffApplyForOrder} />  
  <Route exact path="/StaffHomepage/Myorders/:BID" component={StaffViewMyOrders} /> 
  <Route exact path="/viewOrders/viewOrdertrack/:OID" component={ViewOrdertrack} />
  <Route exact path="/updateOnTheWay/:BID/:OID" component={StaffUpdateOntheWay} /> 
  <Route exact path="/updateOnComplete/:BID/:OID" component={Staffupdatewhencomplete} />  
  <Route exact path="/StaffHomepage/Myreviews/:BID" component={StaffViewReviews} />



        </div>
      </Router>
    );
  }
}

export default App;
