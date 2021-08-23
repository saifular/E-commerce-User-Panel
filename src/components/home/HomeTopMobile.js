import React, {Component,Fragment} from 'react';
import {Container,Row,Col} from "react-bootstrap";


class HomeTopMobile extends Component {
    render() {
        return (
            <Fragment>
                <Container className="p-0 TopSection overflow-hidden" fluid={true}>
                    <Row className="p-0 m-0 overflow-hidden">
                        <Col className="p-0 m-0 overflow-hidden" lg={12} md={12} sm={12}>

                        </Col>
                    </Row>
                </Container>

            </Fragment>
        );
    }
}

export default HomeTopMobile;