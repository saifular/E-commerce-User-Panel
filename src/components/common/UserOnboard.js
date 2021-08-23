import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import validation from "../../validation/validation";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import {Redirect} from "react-router";
import 'react-toastify/dist/ReactToastify.css';
class UserOnboard extends Component {

    constructor() {
        super();
        this.state={
            image:"",
            name:"",
            mobile:"",
            password:""
        }
    }
    imageOnChange=(event)=>{
        let image=event.target.files[0];
        this.setState({image:image})
      }


    nameOnChange=(event)=>{
      let name=event.target.value;
      this.setState({name:name})
    }

    mobileOnChange=(event)=>{
        let mobile=event.target.value;
        this.setState({mobile:mobile})
    }
    passwordOnChange=(event)=>{
        let password=event.target.value;
        this.setState({password:password})
    }

    onFormSubmit=(event)=>{
        let image=this.state.image;
        let name=this.state.name;
        let mobile=this.state.mobile;
        let password=this.state.password;
        let sendBtn=document.getElementById('sendBtn');
        let signupForm=document.getElementById('signupForm');

        if(image.length==0){
            toast.error("Image Required",{
                position:"bottom-center"
            });
        }
       else if(name.length==0){
            toast.error("Name Required",{
                position:"bottom-center"
            });
        }
        else if(mobile.length==0){
            toast.error("Mobile Number Required",{
                position:"bottom-center"
            });
        }

        else if(!(validation.NameRegx).test(name)){
            toast.error("Invalid Name",{
                position:"bottom-center"
            });
        }
        else if(!(validation.MobileRegx).test(mobile)){
            toast.error("Invalid Mobile Number",{
                position:"bottom-center"
            });
        }
        else if(password.length==0){
            toast.error("Please Write Your password",{
                position:"bottom-center"
            });
        }
        else{
            sendBtn.innerHTML="Sending...";
            let MyFormData=new FormData();
            MyFormData.append("image",image)
            MyFormData.append("name",name)
            MyFormData.append("mobile",mobile)
            MyFormData.append("password",password)

            axios.post(ApiURL.SendSingup,MyFormData).then(function (response) {
                if(response.status==200 && response.data==1){
                    toast.success("Request Success",{
                        position:"bottom-center"
                    });
                    sendBtn.innerHTML="send";
                    signupForm.reset();
                }
                else{
                    toast.error("Request Fail ! Try Again",{
                        position:"bottom-center"
                    });
                    sendBtn.innerHTML="send"
                }
            }).catch(function (error) {
                toast.error("Request Fail ! Try Again",{
                    position:"bottom-center"
                });
                sendBtn.innerHTML="send"
            })
        }


        event.preventDefault();
    }


    render() {
        return (
            <Fragment>
                <Container className="TopSection">
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                                    <Form id="signupForm" className="onboardForm" onSubmit={this.onFormSubmit}>
                                        <h4 className="section-title">USER SIGN UP</h4>
                                        <h6 className="section-sub-title">Please Enter Your Photo,Naame,Mobile No,password</h6>
                                        <input onChange={this.imageOnChange} className="form-control m-2" type="file" placeholder="Your Photo"/>
                                        <input onChange={this.nameOnChange} className="form-control m-2" type="text" placeholder="Your Name"/>
                                        <input onChange={this.mobileOnChange} className="form-control m-2" type="text" placeholder="Mobile Number"/>
                                        <input onChange={this.passwordOnChange} className="form-control m-2" type="password" placeholder="Password"/>
                                        <Button id="sendBtn" type="submit" className="btn btn-block m-2 site-btn">SIGNUP</Button>
                                    </Form>
                                </Col>
                                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                                    <img className="onboardBanner" src="Images/otppagebanner.png"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer />
       
        
            </Fragment>
        );
    }
}

export default UserOnboard;
