import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import axios from "axios";
import ApiURL from "../../api/ApiURL";
import {Link} from "react-router-dom";

class ReviewList extends Component {
    constructor() {
        super();
        this.state={
            ReviewData:[],
        }
    }

    componentDidMount() {
        let code=this.props.code;
        axios.get(ApiURL.ReviewList(code)).then((res)=>{
            this.setState({ReviewData:res.data})
        })
    }


    render() {
        let MyList=this.state.ReviewData;

        if(MyList.length>0){

            const MyView=MyList.map((list,i)=>{

                if(list.reviewer_rating==="1"){
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{list.reviewer_name}</span>
                            <span className="text-success">
                                <i className="fa fa-star"/>
                            </span>
                        </p>
                        <p>{list.reviewer_comments}</p>
                    </div>
                }
                else if(list.reviewer_rating==="2"){
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{list.reviewer_name}</span>
                            <span className="text-success">
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                            </span>
                        </p>
                        <p>{list.reviewer_comments}</p>
                    </div>
                }
                else if(list.reviewer_rating==="3"){
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{list.reviewer_name}</span>
                            <span className="text-success">
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                            </span>
                        </p>
                        <p>{list.reviewer_comments}</p>
                    </div>
                }
                else if(list.reviewer_rating==="4"){
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{list.reviewer_name}</span>
                            <span className="text-success">
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                            </span>
                        </p>
                        <p>{list.reviewer_comments}</p>
                    </div>
                }
                else if(list.reviewer_rating==="5"){
                    return <div>
                        <p className=" p-0 m-0"><span className="Review-Title">{list.reviewer_name}</span>
                            <span className="text-success">
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                                <i className="fa fa-star"/>
                            </span>
                        </p>
                        <p>{list.reviewer_comments}</p>
                    </div>
                }
                });
            return (
                <div>
                    <h6 className="mt-2">REVIEWS</h6>
                    {MyView}
                </div>
            );
        }
        else {
            return (
                <div>
                    <h6 className="mt-2">REVIEWS</h6>
                    <p>................</p>
                </div>
            );
        }




    }
}

export default ReviewList;