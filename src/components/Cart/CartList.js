import React, {Component,Fragment} from 'react';
import {Col,Container,Row,Breadcrumb} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import SessionHelper from '../../SessionHelper/SessionHelper';
import {Redirect} from "react-router";
import ProductListLoader from "../placeholder/ProductListLoader";
import {toast} from "react-toastify";

class CartList extends Component {
    constructor() {
        super();
        this.state={
            ProductData:[],
            isLoading:"",
            MainDiv:"d-none",
            PageRefreshStatus:false,
            PageRedirectStatus:false,
            confirmBtn:"Confirm Order",
            totalPriceSum:"",
            city:"",
            payment:"",
            name:"",
            address:"",
        
        }
    }


    componentDidMount() {
        window.scroll(0,0)
        axios.get(ApiURL.CartList(SessionHelper.getUserMobile())).then(response=> {
            this.setState({ProductData:response.data,isLoading:"d-none",MainDiv:" "})
        })
    }


    removeItem=(id)=>{
        axios.get(ApiURL.RemoveCartList(id)).then((res)=>{
            if(res.data===1){
                toast.success("Item Removed",{position:'bottom-center'})
                this.setState({PageRefreshStatus:true})
            }
            else{
                toast.error("Request Fail ! Try Again",{position:'bottom-center'})
            }
        }).catch((err)=>{
            toast.error("Request Fail ! Try Again",{position:'bottom-center'})
        })
    }

    itemPlus=(id,quantity,price)=>{
       axios.get(ApiURL.CartItemPlus(id,quantity,price)).then((res)=>{
           if(res.data===1){
               toast.success("Item Quantity Increased",{position:'bottom-center'})
               this.setState({PageRefreshStatus:true})
           }
           else {
               toast.error("Request Fail ! Try Again",{position:'bottom-center'})
           }

       }).catch((err)=>{
           toast.error("Request Fail ! Try Again",{position:'bottom-center'})
       })


    }

    itemMinus=(id,quantity,price)=>{

        axios.get(ApiURL.CartItemMinus(id,quantity,price)).then((res)=>{
            if(res.data===1){
                toast.success("Item Quantity Decreased",{position:'bottom-center'})
                this.setState({PageRefreshStatus:true})
            }
            else {
                toast.error("Request Fail ! Try Again",{position:'bottom-center'})
            }
        }).catch((err)=>{
            toast.error("Request Fail ! Try Again",{position:'bottom-center'})
        })

    }

    PageRefresh=()=>{
        if(this.state.PageRefreshStatus===true){
           
            return(
                <Redirect to="/cart"/>
            )
        }
    }


    PageRedirect=()=>{
        if(this.state.PageRedirectStatus===true){
            return(
                <Redirect to="/orderlist"/>
            )
        }
    }

    cityOnChange=(event)=>{
      let city= event.target.value;
      this.setState({city:city})
    }
    paymentMethodOnChange=(event)=>{
        let payment= event.target.value;
        this.setState({payment:payment})
    }
    nameOnChange=(event)=>{
        let name= event.target.value;
        this.setState({name:name})
    }

    addressOnChange=(event)=>{
        let address= event.target.value;
        this.setState({address:address})
    }

    confirmOnClick=()=>{
        let city= this.state.city;
        let payment=this.state.payment;
        let name=this.state.name;
        let address=this.state.address;

        if(city.length===0){
            toast.error("Please select city",{position:'bottom-center'})
        }
        else if(payment.length===0){
            toast.error("Select payment method",{position:'bottom-center'})
        }
        else if(name.length===0){
            toast.error("Your name required",{position:'bottom-center'})
        }
        else if(address.length===0){
            toast.error("Delivery address required",{position:'bottom-center'})
        }
        else{

            let invoice=new Date().getTime();
            let MyFormData=new FormData();
            MyFormData.append('city',city)
            MyFormData.append('paymentMethod',payment)
            MyFormData.append('yourName',name)
            MyFormData.append('deliveryAddress',address)
            MyFormData.append('mobileNumber',SessionHelper.getUserMobile())
            MyFormData.append('invoice_no',invoice)
            MyFormData.append('ShippingPrice',"0000");

            axios.post(ApiURL.CartOrder,MyFormData).then((res)=>{
                if(res.data===1){
                    toast.success("Order request received",{position:'bottom-center'})
                    this.setState({PageRedirectStatus:true});
                }
                else{
                    toast.error("Request Fail ! Try Again",{position:'bottom-center'})
                }
            }).catch((err)=>{
                toast.error("Request Fail ! Try Again",{position:'bottom-center'})
            })


        }
    }


    render() {
        const MyList=this.state.ProductData;
        let totalPriceSum=0;
        var a=0;
        var b=0;
        const MyView=MyList.map((ProductList,i)=>{
            totalPriceSum=totalPriceSum+parseInt(ProductList.total_price)
            return <div className="container">
                    <div className="row">
                        <div className="col-md-3 text-center col-lg-3 col-sm-4 col-6">
                            <img className="w-100" src={"http://127.0.0.1:8000/" +ProductList.img} alt=""/>
                            <button onClick={()=>this.removeItem(ProductList.id)}  className="btn mt-2 btn-sm site-btn"><i className="fa fa-trash-alt"/></button>
                            <button onClick={()=>this.itemPlus(ProductList.id,ProductList.product_quantity,ProductList.unit_price)}  className="btn mt-2 mx-1 btn-sm site-btn"><i className="fa fa-plus"/></button>
                            <button onClick={()=>this.itemMinus(ProductList.id,ProductList.product_quantity,ProductList.unit_price)}  pquantity={ProductList.product_quantity} className="btn mt-2 mx-1 btn-sm site-btn"><i className="fa fa-minus"/></button>
                        </div>
                        <div className="col-md-7 col-lg-7 col-sm-8 col-6">
                            <h5 className="product-name-on-card">{(ProductList.product_name).substring(0,50) }</h5>
                            <h5 className="product-price-on-card">Total Price:{ProductList.total_price}TK</h5>
                            <h5 className="product-name-on-card">{ProductList.product_info}</h5>
                            <h5 className="product-price-on-card">Quantity:{ProductList.product_quantity}</h5>
                        </div>
                    </div>
                    <hr/>
                   </div>

        })



        return (
            <Fragment>
                <ProductListLoader isLoading={this.state.isLoading}/>
                <Container className={this.state.MainDiv +" animated slideInDown TopSection"} fluid={true}>
                    <Row>
                        <Breadcrumb className="shadow-sm w-100 bg-white">
                            <Breadcrumb.Item> <Link to="/">Home</Link>    </Breadcrumb.Item>
                            <Breadcrumb.Item> <Link to={"/cart"}>Cart</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </Row>
                    <Row className="mt-3">
                        <Col md={7} lg={7} sm={12} xs={12}>
                            {MyView}
                        </Col>
                        <Col md={5} lg={5} sm={12} xs={12}>
                            <div className="card p-2">
                                        <div className="card-body">
                                            <div className="container-fluid ">
                                                <div className="row">
                                                    <div className="col-md-12 p-1  col-lg-12 col-sm-12 col-12">
                                                        <h5 className="Product-Name text-danger">Total Due: {totalPriceSum} TK</h5>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Choose City</label>
                                                        <select onChange={this.cityOnChange}  className="form-control">
                                                            <option value="">Choose</option>
                                                            <option value="Dhaka">Dhaka</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Choose Payment Method</label>
                                                        <select onChange={this.paymentMethodOnChange} className="form-control">
                                                            <option value="">Choose</option>
                                                            <option value="Cash On Delivery">Cash On Delivery</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Your Name</label>
                                                        <input onChange={this.nameOnChange} className="form-control" type="text" placeholder=""/>
                                                    </div>

                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <label className="form-label">Delivery Address</label>
                                                        <textarea onChange={this.addressOnChange}  rows={2}  className="form-control" type="text" placeholder=""/>
                                                    </div>
                                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                        <button onClick={this.confirmOnClick}  className="btn  site-btn">{this.state.confirmBtn}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        </Col>


                    </Row>
                </Container>
                {this.PageRefresh()}

                {this.PageRedirect()}
            </Fragment>
        );
    }
}

export default CartList;