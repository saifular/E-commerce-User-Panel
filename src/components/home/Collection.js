import React, {Component,Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import SpecialCollectionPlaceholder from "../placeholder/SpecialCollectionPlaceholder";
import {Link} from "react-router-dom";

class Collection extends Component {

    constructor() {
        super();
        this.state={
            ProductData:[],
            isLoading:"BetweenTwoSection",
            MainDiv:"d-none"
        }
    }

    componentDidMount() {
        axios.get(ApiURL.ProductListByRemark("COLLECTION")).then(response=> {
            this.setState({ProductData:response.data,isLoading:"d-none",MainDiv:" "})
        }).catch(error=> {

        });
    }




    render() {



        const MyList=this.state.ProductData;
        const MyView=MyList.map((ProductList,i)=>{


            if(ProductList.special_price=="NA"){
                return  <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6} >
                    <Link to={"productDetails/"+ProductList.product_code}>
                    <Card className="card h-100  text-center w-100  image-box ">
                        <img src={ "http://127.0.0.1:8000/" +ProductList.image}/>
                        <Card.Body>
                            <h5 className="product-name-on-card">{ProductList.title }</h5>
                            <p className="product-price-on-card">Price: { ProductList.price}TK</p>
                        </Card.Body>
                    </Card>
                    </Link>
                </Col>
            }
            else{

                return  <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6} >
                    <Card className="card h-100  text-center w-100  image-box ">
                        <img src={ "http://127.0.0.1:8000/" +ProductList.image}/>
                        <Card.Body>
                            <h5 className="product-name-on-card">{ProductList.title }</h5>
                            <p className="product-price-on-card">
                                Price: <strike class="text-secondary">{ ProductList.price}TK</strike>  { ProductList.special_price}TK
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            }

        })


        return (
            <Fragment>

                <SpecialCollectionPlaceholder isLoading={this.state.isLoading}/>
                <div className={this.state.MainDiv}>
                <Container  className="text-center bg-white card-body shadow-sm py-5 BetweenTwoSection" fluid={true}>
                    <h4 className="section-title ">SPECIAL COLLECTION</h4>
                    <h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>
                    <Row >
                        {MyView}
                    </Row>
                </Container>
                </div>
            </Fragment>
        );
    }
}

export default Collection;