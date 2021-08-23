import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ApiURL from "../../api/ApiURL";
import DescriptionPlaceholder from "../placeholder/DescriptionPlaceholder";

import {toast, ToastContainer} from "react-toastify";
class Policy extends Component {
    constructor() {
        super();
        this.state={
            Policy:"",
            loaderDiv:"",
            mainDiv:"d-none",
        }
    }
    componentDidMount() {
        let SiteInfoPolicy= sessionStorage.getItem("SiteInfoPolicy");
        if(SiteInfoPolicy==null){
            axios.get(ApiURL.SendSiteInfo).then(response=> {
                let  StatusCode =response.status;
                if(StatusCode==200){
                    let  JSONData =(response.data)[0]['ploicy'];
                    this.setState({Policy:JSONData,loaderDiv:"d-none",mainDiv:""})
                    sessionStorage.setItem("SiteInfoPolicy",JSONData)
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
            this.setState({Policy:SiteInfoPolicy,loaderDiv:"d-none",mainDiv:""})
        }
    }



    render() {
        return (
            <Fragment>
                <DescriptionPlaceholder isLoading={this.state.loaderDiv}/>
                <Container className="TopSection">
                    <Row>
                        <Col className="mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Card className={this.state.mainDiv}>
                                <Card.Body>
                                    { ReactHtmlParser(this.state.Policy) }
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
export default Policy;