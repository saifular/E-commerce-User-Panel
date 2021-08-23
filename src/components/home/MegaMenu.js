import React, {Component,Fragment} from 'react';
import {Link} from "react-router-dom";

class MegaMenu extends Component {

    constructor() {
        super();

    }

    MenuItemClick=(event)=>{
        event.target.classList.toggle("active");
        let panel=event.target.nextElementSibling;
        if(panel.style.maxHeight){
            panel.style.maxHeight=null;
        }
        else{
            panel.style.maxHeight=panel.scrollHeight+ "px"
        }
    }


    render() {

        const MyList=this.props.data;

        const MyView=MyList.map((ParentList,i)=>{

            return <div key={i.toString()}>
                <button onClick={this.MenuItemClick} className="accordion"> <img className="accordionMenuIcon" src={"http://127.0.0.1:8000/"+ ParentList.ParentCategoryImg}/>  {ParentList.ParentCategoryName}</button>
                <div className="panel">
                    <ul>
                        {
                            (ParentList.SubCategory).map((ChildList,i)=>{
                                return  <li key={i.toString()}>
                                    <Link to={"ProductListBySubCategory/"+ChildList.cat1_name+"/"+ChildList.cat2_name} className="accordionItem">{ChildList.cat2_name}</Link>
                                </li>
                            })
                        }
                    </ul>
                </div>

            </div>

        })


        return (
            <div className="accordionMenuDiv">
                <div className="accordionMenuDivInside">
                    {MyView}
                </div>
            </div>
        );
    }
}

export default MegaMenu;