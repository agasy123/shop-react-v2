import React from 'react';
import {Link} from 'react-router-dom';
import UserAuth from './userAuth';
import {
	SignedIn,
	SignInButton,
	SignedOut,
	UserButton,
	SignOutButton,
} from "@clerk/clerk-react";
import { useTranslation } from "../context/LanguageContext";

function User() {
	const { t } = useTranslation();
	if (UserAuth()[0]) {	
		return <><li>{t("nav.welcomeAdmin")}</li><li><SignedIn><Link to="/admin">{t("nav.adminPanel")}</Link></SignedIn></li></>
	}else {
		return <li>{t("nav.welcomeUser")} {UserAuth()[1]}</li>
	}
}

function NavBar() {
	const { language, toggleLanguage, t } = useTranslation();

    return(
        <header>
		    <nav>
                <h1 id='logo-text'>Aghasi Harutyunyan</h1>
			    <ul className='menu'>
				    <li><Link to="/">{t("nav.home")}</Link></li>
				    <li><Link to="/products">{t("nav.products")}</Link></li>
				    <li><Link to="/contact">{t("nav.contact")}</Link></li>
					<li><Link to="/cart">{t("nav.cart")}</Link></li>
				    <li><SignedOut><SignInButton /> </SignedOut><SignedIn><UserButton showName={true}/><SignOutButton /></SignedIn></li>
					<SignedIn><User /></SignedIn>
					<li>
						<button 
							type="button" 
							className="lang-btn" 
							onClick={toggleLanguage}
							title="Change Language"
						>
							🌐 {language === 'hy' ? 'EN' : 'ՀԱՅ'}
						</button>
					</li>
			    </ul>
		    </nav>
	    </header>
    )
}

export default NavBar;
