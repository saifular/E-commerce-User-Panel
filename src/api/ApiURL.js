class ApiURL{
    
    static BaseURL="http://127.0.0.1:8000/api/";
    static  VisitorDetails=this.BaseURL+"SendVisitorDetails";
    static  SendContactDetails=this.BaseURL+"SendContactDetails";
    static  SendSiteInfo=this.BaseURL+"SendSiteInfo";
    static  SendCategoryDetails=this.BaseURL+"SendCategoryDetails";
    static  SendSingup=this.BaseURL+"SendSingup";
    static  Verification=this.BaseURL+"Verification";

    static  ProductListByRemark(Remark){
        return this.BaseURL+"ProductListByRemark/"+Remark;
    };

    static  ProductListByCategory(Category){
        return this.BaseURL+"ProductListByCategory/"+Category;
    };

    static  ProductListBySubCategory(Category,SubCategory){
        return this.BaseURL+"ProductListBySubCategory/"+Category+"/"+SubCategory;
    };


    static  SendSliderInfo=this.BaseURL+"SendSliderInfo";


    static  ProductDetails(ProductCode){
        return this.BaseURL+"ProductDetails/"+ProductCode;
    }


    static  NotificationHistory=this.BaseURL+"NotificationHistory";


    static  ProductListBySearch(SearchKey){
        return this.BaseURL+"ProductBySearch/"+SearchKey;
    }

    static SimilarProduct(subcategory){
        return this.BaseURL+"SimilarProduct/"+subcategory;
    }
    static  ReviewList(code){
        return this.BaseURL+"reviewList/"+code;
    }

    static  addToCart=this.BaseURL+"addToCart";

    static  CartCount(mobile){
        return this.BaseURL+"CartCount/"+mobile;
    }
    static  AddFav(mobile,code){
        return this.BaseURL+"addFav/"+code+"/"+mobile;
    }
    static  favList(mobile){
        return this.BaseURL+"favList/"+mobile;
    }
    static  removeFavItem(mobile,code){
        return this.BaseURL+"removeFavItem/"+code+"/"+mobile;
    }


    static  CartList(mobile){
        return this.BaseURL+"CartList/"+mobile;
    }

    static RemoveCartList(id){
        return this.BaseURL+"RemoveCartList/"+id;
    }

    static CartItemMinus(id,quantity,price){
        return this.BaseURL+"CartItemMinus/"+id+"/"+quantity+"/"+price;
    }

    static CartItemPlus(id,quantity,price){
        return this.BaseURL+"CartItemPlus/"+id+"/"+quantity+"/"+price;
    }

    static  CartOrder=this.BaseURL+"CartOrder";


    static  OrderListByUser(mobile){
        return this.BaseURL+"OrderListByUser/"+mobile;
    }

    static  postReview=this.BaseURL+"postReview";
    
    static  Ananna=this.BaseURL+"Ananna";
    static  SubCategory=this.BaseURL+"SubCategory";
    static  Category=this.BaseURL+"Category";
    static  SignUp(mobile){
        return this.BaseURL+"SignUp/"+mobile;
    }
}
export default ApiURL;
