import React, {Component, Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ApiURL from "../../api/ApiURL";
import DescriptionPlaceholder from "../placeholder/DescriptionPlaceholder";

import {toast, ToastContainer} from "react-toastify";

class Purchase extends Component {



    constructor() {
        super();
        this.state={
            purchase_guide:"",
            loaderDiv:"",
            mainDiv:"d-none",
        }
    }


    componentDidMount() {
        let SiteInfo_purchase_guide= sessionStorage.getItem("SiteInfo_purchase_guide");
        if(SiteInfo_purchase_guide==null){
            axios.get(ApiURL.SendSiteInfo).then(response=> {
                let  StatusCode =response.status;
                if(StatusCode==200){
                    let  JSONData =(response.data)[0]['purchase_guide'];
                    this.setState({purchase_guide:JSONData,loaderDiv:"d-none",mainDiv:""})
                    sessionStorage.setItem("SiteInfo_purchase_guide",JSONData)
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
            this.setState({purchase_guide:SiteInfo_purchase_guide,loaderDiv:"d-none",mainDiv:""})
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
                                    { ReactHtmlParser(this.state.purchase_guide) }
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

export default Purchase;