import React, {Component,Fragment} from 'react';
import {Container, Row, Col,Dropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Redirect} from "react-router";
import SessionHelper from '../../SessionHelper/SessionHelper';
import axios from "axios";
import ApiURL from "../../api/ApiURL";

class NavMenuDesktop extends Component {


    constructor() {
        super();
        this.state={
            SearchKey:"",
            SearchRedirectStatus: false,
            RedirectHome:false,
            ananna:[],
            name:"",
            image:"",
            mobile:"",

        }

        this.SearchOnChange=this.SearchOnChange.bind(this);
        this.SearchOnClick=this.SearchOnClick.bind(this);
        this.searchRedirect=this.searchRedirect.bind(this);
        this.signOut=this.signOut.bind(this);
        this.RedirectHome=this.RedirectHome.bind(this);

    }
    componentDidMount() {
        axios.get(ApiURL.CartCount(SessionHelper.getUserMobile())).then((res)=>{
            this.setState({cartCount:res.data})    
        })   
     
            axios.get(ApiURL.SignUp(SessionHelper.getUserMobile())).then(response=> {
                let  StatusCode =response.status;
                if(StatusCode==200){
                    let  JSONData =(response.data)[0]['image'];
                    let  JSONData1 =(response.data)[0]['name'];
                    let  JSONData2 =(response.data)[0]['mobile'];
                    this.setState({image:JSONData})
                    this.setState({name:JSONData1})
                    this.setState({mobile:JSONData2})
                }    
                else{
                    
                }

            }).catch(error=> {
             
            });
        
    }
  


    SearchOnChange(event){
      let SearchKey=  event.target.value;
      this.setState({SearchKey:SearchKey});
    }

    SearchOnClick(){
        if(this.state.SearchKey.length>=2){
            this.setState({SearchRedirectStatus:true})
        }
    }


    searchRedirect(){
        if(this.state.SearchRedirectStatus===true){
            return <Redirect to={"/ProductListBySearch/"+this.state.SearchKey} />
        }

    }
    signOut=()=>{
        SessionHelper.removeUserMobile();
        this.setState({RedirectHome:true});
    }
    RedirectHome=()=>{
        if(this.state.RedirectHome===true){
            return(

                <Redirect to="/"/>
            ) 
        }
    }
    imgCellFormat(cell,row){
        return(
            <img style={{width:"60px",height:"auto"}} src={"http://127.0.0.1:8000/"+cell}/>
        )
     }
    render() {



        if(SessionHelper.getUserMobile()===null){
            return (
                <Container fluid={"true"} className="fixed-top shadow-sm p-2 m-0 bg-white">
                    <Row>
                        <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
                            <Link to="/" className="btn"> <img className="nav-logo" src="images/logo.png"/></Link>
                            <Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart"></i> 4 items </Link>
                        </Col>
                        <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
                            <div className="input-group w-100">
                                <input onChange={this.SearchOnChange} name="example" list="exampleList" type="text" className="form-control" aria-label="Text input with segmented dropdown button"/>

                                <button onClick={this.SearchOnClick} type="button" className="btn site-btn"><i className="fa fa-search"></i></button>
                            </div>
                        </Col>
                        <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
                            <Link to="/favourite" className="btn"><i className="fa h4 fa-heart"></i>  <sup><span className="badge text-white bg-danger">4</span></sup></Link>
                            <Link to="/notification" className="btn"><i className="fa h4  fa-bell"></i> <sup><span className="badge text-white bg-danger">4</span></sup></Link>
                            <a className="btn"><i className="fa h4 fa-mobile-alt"></i> </a>
                            <Link to="/board" className="h4 btn">LOGIN</Link>
                            <Link to="/onboard" className="h4 btn">SIGNUP</Link>
                        </Col>
                    </Row>

                    {this.searchRedirect()}
                </Container>



    );
        }
        else{
            const myroni=this.state.image;
            const myroni1=this.state.name;
            const myroni2=this.state.mobile;
            return (
          
                <Container fluid={"true"} className="fixed-top shadow-sm p-2 m-0 bg-white">
                    <Row>
                        <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
                            <Link to="/" className="btn"> <img className="nav-logo" src="images/logo.png"/></Link>
                            <Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart"></i> {this.state.cartCount} items </Link>
                        </Col>
                        <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
                            <div className="input-group w-100">
                                <input onChange={this.SearchOnChange} name="example" list="exampleList" type="text" className="form-control" aria-label="Text input with segmented dropdown button"/>

                                <button onClick={this.SearchOnClick} type="button" className="btn site-btn"><i className="fa fa-search"></i></button>
                            </div>
                        </Col>
                        <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
                            <Link to="/favourite" className="btn"><i className="fa h4 fa-heart"></i>  <sup><span className="badge text-white bg-danger"></span></sup></Link>
                            <Link to="/notification" className="btn"><i className="fa h4  fa-bell"></i> <sup><span className="badge text-white bg-danger"></span></sup></Link>
                            <Link to="/orderlist" className="btn nav-round-btn"><i className="fa h4 fa-shopping-cart"></i></Link>
    
                            <Dropdown className="h4 btn">
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                          <img className="nav-logo" src={"http://127.0.0.1:8000/" +myroni}/>
                           </Dropdown.Toggle>

                           <Dropdown.Menu>
                           <Link className="h4 btn" > {myroni1} </Link>
                           <Link className="h4 btn" > {myroni2} </Link>
                            <Link className="h4 btn" to="/board"  onClick={this.signOut}> Log Out </Link>
                              </Dropdown.Menu>
                             </Dropdown>
    
                        </Col>
                    </Row>

                    {this.searchRedirect()}
                    {this.RedirectHome()}
                </Container>



    );

        }
     
    }
}

export default NavMenuDesktop;