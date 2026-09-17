import React from 'react';
import {Link} from "react-router-dom";

function home(){
    return(
        <div>
            <div className='homediv'>
        <div>
            <img id="homeIphone1" src="iphone1.jpg" alt="not found"></img>
            <img id="homeIphone2" src="iphone2.jpg" alt="not found"></img>
            <img id="homeIphone3" src="iphone3.jpg" alt="not found"></img>
        </div>
        <div className="homepage">
            <h1 id='homepage-h1'>HOME PAGE</h1>
            <h2 id='homepage-text'>Our main phone is Iphone, but you can find other phones in products page</h2>
            <Link className="prodPageButton" href="products">Click here to go to products page</Link>
         </div>
    </div>
        </div>
    )
}

export default home;