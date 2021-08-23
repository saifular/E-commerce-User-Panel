import React, {Component} from 'react';
import Slider from "react-slick";
import {Link} from "react-router-dom";
class SliderHome extends Component {
    render() {
        const settings = {
            dots: true,
            arrows: false,
            infinite: true,
            autoplay:true,
            autoplaySpeed:4000,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const SliderData=this.props.data;
          const SliderView=  SliderData.map((SliderList,i)=>{
           return <div  className="container-fluid m-0 p-0 overflow-hidden w-100 shadow-sm">
             <div style={{backgroundColor:SliderList.bg_color}} className="m-0 p-0">
               <div className="row card-body">
                   <div className="col-md-6 slider-title-div animated slideInDown text-center">
                       <h1 style={{color:SliderList.text_color}} className="slider-title">{SliderList.title}</h1>
                       <h1 style={{color:SliderList.text_color}} className="slider-sub-title">
                           {SliderList.sub_title}
                       </h1>
                       <Link to={"productDetails/"+SliderList.product_code} className="btn site-btn px-5">More Info</Link>
                   </div>
                   <div className="col-md-6 animated slideInDown text-center">
                       <img className="slider-img" src={"http://127.0.0.1:8000/" +SliderList.image} alt="slider img"/>
                   </div>
               </div>
           </div>
           </div>
        })
        return (
                <Slider {...settings}>
                    {SliderView}
                </Slider>
        );
    }
}
export default SliderHome;