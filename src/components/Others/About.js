import React, {Component, Fragment} from 'react';
import {Breadcrumb, Card, Col, Container, Row} from "react-bootstrap";
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ApiURL from "../../api/ApiURL";
import {toast, ToastContainer} from "react-toastify";
import DescriptionPlaceholder from "../placeholder/DescriptionPlaceholder";
import {Link} from "react-router-dom";
class About extends Component {
    constructor() {
        super();
        this.state={
            about:"",
            loaderDiv:"",
            mainDiv:"d-none",
        }
    }

    componentDidMount() {
      let SiteInfoAbout= sessionStorage.getItem("SiteInfoAbout");
        if(SiteInfoAbout==null){
            axios.get(ApiURL.SendSiteInfo).then(response=> {
                let  StatusCode =response.status;
                if(StatusCode==200){
                    let  JSONData =(response.data)[0]['about'];
                    this.setState({about:JSONData,loaderDiv:"d-none",mainDiv:""})
                    sessionStorage.setItem("SiteInfoAbout",JSONData)
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
            this.setState({about:SiteInfoAbout,loaderDiv:"d-none",mainDiv:""})
        }
    }


    render() {
        return (
            <Fragment>
                <DescriptionPlaceholder isLoading={this.state.loaderDiv}/>
                <Container className="TopSection">
                    <Breadcrumb>
                        <Breadcrumb.Item> <Link to="/">Home</Link>    </Breadcrumb.Item>
                        <Breadcrumb.Item> <Link to="/about">About</Link>    </Breadcrumb.Item>

                    </Breadcrumb>
                    <Row>
                        <Col className="mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Card className={this.state.mainDiv}>
                                <Card.Body>
                                    { ReactHtmlParser(this.state.about) }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <ToastContainer />
            </Fragment>
        );
    }
}

export default About;