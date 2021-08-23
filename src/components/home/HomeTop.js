import React, {Component,Fragment} from 'react';
import {Container,Row,Col} from "react-bootstrap";
import MegaMenu from "./MegaMenu";
import SliderHome from "./SliderHome";
import ApiURL from "../../api/ApiURL";
import axios from 'axios';
import SliderLoader from "../placeholder/SliderLoader";

class HomeTop extends Component {
        constructor() {
            super();
            this.state={
                MenuData:[],
                SliderData:[],
                isLoading:"TopSection",
                MainDiv:"d-none"
            }
        }


        componentDidMount() {
            axios.get(ApiURL.SendCategoryDetails).then(response=> {
              this.setState({MenuData:response.data})
            }).catch(error=> {

            });

            // Slider Info
            axios.get(ApiURL.SendSliderInfo).then(response=> {
                this.setState({SliderData:response.data,isLoading:"d-none",MainDiv:" "})
            }).catch(error=> {

            });
        }




    render() {
        return (
            <Fragment>

                <SliderLoader isLoading={this.state.isLoading} />

                <div className={this.state.MainDiv}>
                    <Container className="p-0 TopSection  overflow-hidden" fluid={true}>
                        <Row className="p-0 m-0 overflow-hidden">
                            <Col className="p-0 m-0 overflow-hidden" lg={3} md={3} sm={12}>
                                <MegaMenu data={this.state.MenuData}/>
                            </Col>
                            <Col className="p-0 m-0 overflow-hidden" lg={9} md={9} sm={12}>
                                <SliderHome data={this.state.SliderData}/>
                            </Col>
                        </Row>
                    </Container>
                </div>



            </Fragment>
        );
    }
}

export default HomeTop;