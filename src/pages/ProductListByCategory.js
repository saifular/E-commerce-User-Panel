import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import ListByCategory from "../components/ProductDetails/ListByCategory";
import axios from "axios";
import ApiURL from "../api/ApiURL";
import ProductListLoader from "../components/placeholder/ProductListLoader";

class ProductListByCategory extends Component {

    constructor({match}) {
        super();
        this.state={
            Category:match.params.Category,
            ProductData:[],
            isLoading:"",
            MainDiv:"d-none"
        }

    }


    componentDidMount() {
        window.scroll(0,0)
        axios.get(ApiURL.ProductListByCategory(this.state.Category)).then(response=> {
            this.setState({ProductData:response.data,isLoading:"d-none",MainDiv:" "})
        }).catch(error=> {

        });
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



                <ProductListLoader isLoading={this.state.isLoading}/>
                <div className={this.state.MainDiv}>
                    <ListByCategory Category={this.state.Category}  ProductData={this.state.ProductData} />
                </div>



                <div className="Desktop">
                    <FooterDesktop/>
                </div>
                <div className="Mobile">
                    <FooterMobile/>
                </div>

            </Fragment>
        );
    }
}

export default ProductListByCategory;