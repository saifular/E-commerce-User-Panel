import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import axios from "axios";
import ApiURL from "../api/ApiURL";
import ListBySubCategory from "../components/ProductDetails/ListBySubCategory";
import ProductListLoader from "../components/placeholder/ProductListLoader";
import ListByCategory from "../components/ProductDetails/ListByCategory";
class ProductListBySubCategory extends Component {

    constructor({match}) {
        super();
        this.state={
            SubCategory:match.params.SubCategory,
            Category:match.params.Category,
            ProductData:[],
            isLoading:"",
            MainDiv:"d-none"
        }

    }


    componentDidMount() {
        window.scroll(0,0)
        axios.get(ApiURL.ProductListBySubCategory(this.state.Category,this.state.SubCategory)).then(response=> {
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
                    <ListBySubCategory  Category={this.state.Category} SubCategory={this.state.SubCategory}  ProductData={this.state.ProductData} />
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

export default ProductListBySubCategory;