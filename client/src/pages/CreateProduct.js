import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios'

class ReviewForm extends Component  {
  constructor(props){
    super(props);
    this.state = { 
      name:"",
      category:"",
      details:"",
      stock:0,
      imagesrc:"",
      productPrice:0,
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
handleChangeCatgeory=e=>{

  this.setState({
    category:e.target.value
  })
}

handleChangeDetails=e=>{
  this.setState({
    details:e.target.value
  })
}

handleChangeStock=e=>{
  this.setState({
    stock:e.target.value
  })
}

handleChangeimagesrc=e=>{
    this.setState({
      imagesrc:e.target.value
    })
  }
handleChangePrice=e=>{
    this.setState({
      productPrice:e.target.value
    })
  }



    getx = async (e) => {

        e.preventDefault();
        
        let databody ={
        name:this.state.name,
        category:this.state.category,
        details:this.state.details,
        stock:this.state.stock,
        imagesrc:this.state.imagesrc,
        productPrice:this.state.productPrice
    }
    console.log(databody)

    axios({url:`http://localhost:5000/api/admin/createNewProduct`,
         method: 'POST',
         data: databody,
         headers: {
          'auth-token':  localStorage.getItem('token'),
             'Content-Type': 'application/json'

          
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
    var load =this.state.load;   //-----> flag for different returns
if(load){
  return (
    <div>
    <form>
    
    
      <h1 style={{ color: "green" }}>Upload new product</h1>
      <input
        style={{ margin: "50px auto", display: "block" }}
        type="text"
        name="name"
        placeholder="product name"
        onChange={this.handleChangeName}
      />
      <input
        style={{ margin: "50px auto", display: "block" }}
        type="text"
        name="category"
        placeholder="product category"
        onChange={this.handleChangeCatgeory}
      />

       <input
        style={{ margin: "50px auto", display: "block" }}
        type="text"
        name="details"
        placeholder="product details"
        onChange={this.handleChangeDetails}
      />
      <input
        style={{ margin: "50px auto", display: "block" }}
        type="number"
        name="stock"
        placeholder="product stock"
        onChange={this.handleChangeStock}
          />
       <input
        style={{ margin: "50px auto", display: "block" }}
        type="number"
        name="productPrice"
        placeholder="product price"
        onChange={this.handleChangePrice}
          />

      <input
        style={{ margin: "50px auto", display: "block" }}
        type="text"
        name="imagesrc"
        placeholder="Prduct image source"
        onChange={this.handleChangeimagesrc}
      />

      <button onClick={this.getx} className="btn btn-success">Add Product</button>

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
    
    
    <h1 style={{ color: "green" }}>Upload new product</h1>

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
