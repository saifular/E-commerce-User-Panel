import React, {Component,Fragment} from 'react';
import {Route, Switch} from "react-router";
import HomePage from "../pages/HomePage";
import UserOnboardPage from "../pages/UserOnboardPage";
import LoginPage from "../pages/LoginPage";
import ContactPage from "../pages/ContactPage";
import PurchasePage from "../pages/PurchasePage";
import PolicyPage from "../pages/PolicyPage";
import RefundPage from "../pages/RefundPage";
import AboutPage from "../pages/AboutPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import NotificationPage from "../pages/NotificationPage";
import FavouritePage from "../pages/FavouritePage";
import CartPage from "../pages/CartPage";
import OrderPage from "../pages/OrderPage";
import ProductListByCategory from "../pages/ProductListByCategory";
import ProductListBySubCategory from "../pages/ProductListBySubCategory";
import SearchPage from "../pages/SearchPage";
import OrderListPage from "../pages/OrderListPage";

class AppRoute extends Component {
    render() {
        return (
            <Fragment>

                <Switch>
                    <Route exact path="/"  render={(props) => <HomePage {...props} key={Date.now()}/>}/>
                    <Route exact path="/onboard" render={(props) => <UserOnboardPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/board" render={(props) => <LoginPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/contact" render={(props) => <ContactPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/purchase" render={(props) => <PurchasePage {...props} key={Date.now()}/>}/>
                    <Route exact path="/policy" render={(props) => <PolicyPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/refund" render={(props) => <RefundPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/about" render={(props) => <AboutPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/productDetails/:code" render={(props) => <ProductDetailsPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/notification" render={(props) => <NotificationPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/favourite" render={(props) => <FavouritePage {...props} key={Date.now()}/>}/>
                    <Route exact path="/cart" render={(props) => <CartPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/order" render={(props) => <OrderPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/ProductListByCategory/:Category" render={(props) => <ProductListByCategory {...props} key={Date.now()}/>}/>
                    <Route exact path="/ProductListBySubCategory/:Category/:SubCategory" render={(props) => <ProductListBySubCategory {...props} key={Date.now()}/>}/>
                    <Route exact path="/ProductListBySearch/:SearchKey" render={(props) => <SearchPage {...props} key={Date.now()}/>}/>
                    <Route exact path="/orderlist" render={(props) => <OrderListPage {...props} key={Date.now()}/>}/>
                


                </Switch>
            </Fragment>
        );
    }
}

export default AppRoute;