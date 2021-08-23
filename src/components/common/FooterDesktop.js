import React, {Component,Fragment} from 'react';
import {Container, Col, Row, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import axios from 'axios';
import ApiURL from "../../api/ApiURL";
import {toast, ToastContainer} from "react-toastify";
class FooterDesktop extends Component {


    constructor() {
        super();
        this.state={
            footerData:"",
            androidLink:"",
            iosLink:"",
            facebookLink:"",
            twitterLink:"",
            instagramLink:"",
            address:"",
            aboutCompany:"",
            deliveryNotice:"",
            loaderDiv:"",
            mainDiv:"d-none",
        }
    }

    componentDidMount() {
      let SiteInfoFooter= sessionStorage.getItem("SiteInfoFooter");

        if(SiteInfoFooter==null){
            axios.get(ApiURL.SendSiteInfo).then(response=> {
                let  StatusCode =response.status;
                if(StatusCode==200){
                    let  JSONData =(response.data)[0];
                    this.setState({
                        androidLink:JSONData['android_app_link'],
                        iosLink:JSONData['ios_app_link'],
                        facebookLink:JSONData['facebook_link'],
                        twitterLink:JSONData['twitter_link'],
                        instagramLink:JSONData['instagram_link'],
                        address:JSONData['address'],
                        aboutCompany:JSONData['about_company'],
                        deliveryNotice:JSONData['delivery_notice'],
                        loaderDiv:"d-none",
                        mainDiv:""
                    })

                    sessionStorage.setItem("SiteInfoFooter",JSON.stringify(JSONData))
                }
                else{
                    toast.error("Something Went Wrong ! Try Again",{
                        position:"bottom-center"
                    });
                }

            }).catch(error=> {
                toast.error("Something Went Wrong ! Try Again",{
                    position:"bottom-center"
                });
            });
        }
        else{

            let FooterDataJSON=JSON.parse(SiteInfoFooter);

            this.setState({
                androidLink:FooterDataJSON['android_app_link'],
                iosLink:FooterDataJSON['ios_app_link'],
                facebookLink:FooterDataJSON['facebook_link'],
                twitterLink:FooterDataJSON['twitter_link'],
                instagramLink:FooterDataJSON['instagram_link'],
                address:FooterDataJSON['address'],
                aboutCompany:FooterDataJSON['about_company'],
                deliveryNotice:FooterDataJSON['delivery_notice'],
                loaderDiv:"d-none",
                mainDiv:""
            })
        }
    }


    render() {
        return (
                <div className="m-0 bg-white mt-5 pt-3 shadow-sm">


                    <div className={this.state.loaderDiv}>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={this.state.mainDiv}>
                        <Container>
                            <Row className="px-0 my-5">
                                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                    <h5 className="footer-menu-title">ABOUT COMPANY</h5>
                                    <p> { ReactHtmlParser(this.state.aboutCompany) }</p>
                                    <h5 className="footer-menu-title">SOCIAL LINK</h5>
                                    <a target="_blank" href={this.state.facebookLink}><i className="fab m-1 h4 fa-facebook"></i></a>
                                    <a target="_blank" href={this.state.instagramLink}><i className="fab m-1 h4 fa-instagram"></i></a>
                                    <a target="_blank" href={this.state.twitterLink}><i className="fab m-1 h4 fa-twitter"></i></a>
                                </Col>
                                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                    <h5 className="footer-menu-title">THE COMPANY</h5>
                                    <Link to="/about" className="footer-link">About Us</Link><br/>
                                    <Link to="/contact" className="footer-link">Contact Us</Link><br/>

                                    <h5 className="footer-menu-title mt-3">OFFICE ADDRESS</h5>
                                    <p>{ ReactHtmlParser(this.state.address) }</p>
                                </Col>
                                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                    <h5 className="footer-menu-title">MORE INFO</h5>
                                    <Link to="/purchase" className="footer-link">How To Purchase</Link><br/>
                                    <Link to="/policy" className="footer-link">Privacy Policy</Link><br/>
                                    <Link  to="/refund" className="footer-link">Refund Policy</Link><br/>
                                </Col>
                                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                    <h5 className="footer-menu-title">DOWNLOAD APP</h5>
                                    <a target="_blank" href={this.state.iosLink}><img className="" src="Images/apple.png"/></a><br/>
                                    <a target="_blank" href={this.state.androidLink}><img className="mt-2" src="Images/playstore.png"/></a>
                                </Col>
                            </Row>

                        </Container>
                        <Container fluid={true} className=" m-0 pt-3 pb-1 bg-dark">
                            <Container className="">
                                <Row className="px-0 text-white">
                                    <p>{ ReactHtmlParser(this.state.deliveryNotice) }</p>
                                </Row>
                            </Container>
                        </Container>
                    </div>
                    <ToastContainer />
                </div>

        );
    }
}

export default FooterDesktop;