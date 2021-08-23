import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import OrderList from "../components/Order/OrderList";
import {Redirect} from "react-router";
import SessionHelper from '../SessionHelper/SessionHelper';

class OrderListPage extends Component {

    constructor() {
        super();
        this.state={
            RedirectStatus:false,
        }
    }

    pageRedirect=()=>{
        if(this.state.RedirectStatus===true){
            return(
                <Redirect to="/board"/>
            )
        }
    }

    componentDidMount() {
        window.scroll(0,0)
        let mobile=SessionHelper.getUserMobile();
        if(mobile===null){
            this.setState({RedirectStatus:true})
        }
    }


    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop/>
                </div>
                <div className="Mobile">
                    <NavMenuMobile/>
                </div>

                <OrderList/>

                <div className="Desktop">
                    <FooterDesktop/>
                </div>
                <div className="Mobile">
                    <FooterMobile/>
                </div>

                {this.pageRedirect()}
            </Fragment>
        );
    }
}

export default OrderListPage;