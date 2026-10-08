import React from 'react';
import {Link} from "react-router-dom";
import { useTranslation } from "../context/LanguageContext";

function Home(){
    const { t } = useTranslation();
    return(
        <div>
            <div className='homediv'>
                <div>
                    <img id="homeIphone1" src="iphone1.jpg" alt="not found" width="400" height="400"></img>
                    <img id="homeIphone2" src="iphone2.jpg" alt="not found" width="110" height="110"></img>
                    <img id="homeIphone3" src="iphone3.jpg" alt="not found" width="100" height="100"></img>
                </div>
                <div className="homepage">
                    <h1 id='homepage-h1'>{t("home.title")}</h1>
                    <h2 id='homepage-text'>{t("home.subtitle")}</h2>
                    <Link className="prodPageButton" to="/products">{t("home.ctaButton")}</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;
