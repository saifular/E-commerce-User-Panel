import React, {Component, Fragment} from 'react';
import {Container,Row,Col,Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
class SuggestedProducts extends Component {

    constructor() {
        super();
        this.state={
            ProductData:[],
        }
    }

    componentDidMount() {
        let subcategory=this.props.subcategory;
        axios.get(ApiURL.SimilarProduct(subcategory)).then((res)=>{
            this.setState({ProductData:res.data})
        })
    }

    render() {

        let MyList=this.state.ProductData;
        if(MyList.length>0){
            const MyView=MyList.map((ProductList,i)=>{
                if(ProductList.special_price==="NA"){
                    return <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6} >
                        <Link to={"/productDetails/"+ProductList.product_code}>
                            <Card className="card h-100 w-100  image-box ">
                                <img src={"http://127.0.0.1:8000/"+ProductList.image} alt=""/>
                                <Card.Body>
                                    <h5 className="product-name-on-card">{(ProductList.title).substring(0,50) }</h5>
                                    <p className="product-price-on-card">Price: { ProductList.price}TK</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                }
                else{

                    return <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6} >
                        <Link to={"/productDetails/"+ProductList.product_code}>
                            <Card className="card h-100 w-100  image-box ">
                                <img src={"http://127.0.0.1:8000/"+ProductList.image} alt=""/>
                                <Card.Body>
                                    <h5 className="product-name-on-card">{(ProductList.title).substring(0,50) }</h5>
                                    <p className="product-price-on-card">
                                        Price: <strike class="text-secondary">{ ProductList.price}TK</strike>  { ProductList.special_price}TK
                                    </p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                }

            })
            return (
                <Fragment>
                    <Container fluid={true} className="text-center BetweenTwoSection">
                        <h4 className="section-title">YOU MAY LIKE</h4>
                        <h6 className="section-sub-title">Some Of Our Exclusive Collection, You May Like</h6>
                        <Row>
                            {MyView}
                        </Row>
                    </Container>
                </Fragment>
            );
        }
        else {
            return (
                <Fragment>
                </Fragment>
            );
        }
    }
}

export default SuggestedProducts;