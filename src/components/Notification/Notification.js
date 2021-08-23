import React, {Component,Fragment} from 'react';
import {Card,Modal,Button,Container,Row,Col} from "react-bootstrap";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
class Notification extends Component {


    constructor() {
        super();
        this.state={
            NotificationData:[],
            isLoading:"",
            MainDiv:"d-none",
            NotificationModal:false,
            NotificationDate:"",
            NotificationTitle:"",
            NotificationMsg:"",
        }
        this.handleClose=this.handleClose.bind(this);
        this.handleShow=this.handleShow.bind(this);
    }

    handleClose(){
        this.setState({NotificationModal:false})
    }

    handleShow(event){
        this.setState({NotificationModal:true});
        let Ndate= event.target.getAttribute('data-date');
        let Nmsg= event.target.getAttribute('data-msg');
        let Ntitle= event.target.getAttribute('data-title');
        this.setState({NotificationDate:Ndate,NotificationMsg:Nmsg,NotificationTitle:Ntitle})
    }
    componentDidMount() {
        window.scroll(0,0)
        axios.get(ApiURL.NotificationHistory).then(response=> {
            this.setState({NotificationData:response.data,isLoading:"d-none",MainDiv:" "})
        }).catch(error=> {

        });
    }


    render() {

        let NotificationData=this.state.NotificationData;

       let MyView= NotificationData.map((Mylist,i)=>{

                return(
                    <Col className=" p-1 " md={4} lg={4} sm={12} xs={12}>
                        <Card className="notification-card">
                            <Card.Body>
                                <h6> {Mylist.title}</h6>
                                <p className="py-1  px-0 text-primary m-0"><i className="fa  fa-bell"></i>  {Mylist.date}</p>
                                <button data-msg={Mylist.msg} data-date={Mylist.date} data-title={Mylist.title} onClick={this.handleShow} className="btn site-btn btn-sm">Details</button>
                            </Card.Body>
                        </Card>
                    </Col>
                )

        })


        return (
                <Fragment>
                    <Container fluid={true} className="TopSection">
                        <Row>
                            {MyView}
                        </Row>
                    </Container>


                    <Modal show={this.state.NotificationModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <h6> <i className="fa theme-text fa-bell"></i> Date: {this.state.NotificationDate}</h6>
                        </Modal.Header>
                        <Modal.Body>
                            <h6 className="Notification-title">
                                {this.state.NotificationTitle}
                            </h6>
                            <p>
                                {this.state.NotificationMsg}
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn site-btn" onClick={this.handleClose}>
                                Close
                            </button>
                        </Modal.Footer>
                    </Modal>


                </Fragment>
        );
    }
}

export default Notification;